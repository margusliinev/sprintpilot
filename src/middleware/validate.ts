import { zValidator } from '@hono/zod-validator';
import { ValidationTargets } from 'hono';
import { ZodSchema } from 'zod';
import { BadRequestException } from '../helpers/errors';

export function validate<T extends ZodSchema>(target: keyof ValidationTargets, schema: T) {
    return zValidator(target, schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.reduce(
                (acc, issue) => {
                    const key = issue.path[0];
                    const message = issue.message;
                    if (key && !acc[key]) acc[key] = message;
                    return acc;
                },
                {} as Record<string, string>,
            );
            throw new BadRequestException(errors);
        }
        c.req.addValidatedData(target, result.data);
    });
}
