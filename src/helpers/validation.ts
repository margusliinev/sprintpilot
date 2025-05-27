import type { Errors } from './errors';
import { BadRequestException } from './errors';
import { zValidator } from '@hono/zod-validator';
import { ZodType } from 'zod/v4';

const validateBody = <T extends ZodType>(schema: T) => {
    return zValidator('json', schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                const key = issue.path[0];
                const message = issue.message;
                if (key && !acc[key.toString()]) acc[key.toString()] = message;
                return acc;
            }, {} as Errors);
            throw new BadRequestException(errors);
        }
        c.req.addValidatedData('json', result.data as any);
    });
};

export { validateBody };
