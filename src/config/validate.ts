import { zValidator } from '@hono/zod-validator';
import { ValidationTargets } from 'hono';
import { ZodSchema } from 'zod';

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
