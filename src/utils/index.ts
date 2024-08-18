import { CookieOptions } from 'hono/utils/cookie';
import { zValidator } from '@hono/zod-validator';
import { ValidationTargets } from 'hono';
import { ZodSchema } from 'zod';
import { env } from '../config';

export const defaultCookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax'
};

export function validate<T extends ZodSchema>(target: keyof ValidationTargets, schema: T) {
    return zValidator(target, schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.map((issue) => {
                return {
                    field: issue.path[0],
                    message: issue.message
                };
            });
            const uniqueErrorsPerField = errors.filter((error, index, self) => index === self.findIndex((t) => t.field === error.field));
            return c.json({ success: false, message: 'Bad Request', errors: uniqueErrorsPerField }, 400);
        }
        c.req.addValidatedData(target, result.data);
    });
}
