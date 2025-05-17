import type { Errors } from './errors.ts';
import { BadRequestException } from './errors.ts';
import { zValidator } from '@hono/zod-validator';
import { ZodSchema } from 'zod';

const validateBody = <T extends ZodSchema>(schema: T) => {
    return zValidator('json', schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                const key = issue.path[0];
                const message = issue.message;
                if (key && !acc[key]) acc[key] = message;
                return acc;
            }, {} as Errors);
            throw new BadRequestException(errors);
        }
        c.req.addValidatedData('json', result.data);
    });
};

const validateParams = <T extends ZodSchema>(schema: T) => {
    return zValidator('param', schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                const key = issue.path[0];
                const message = issue.message;
                if (key && !acc[key]) acc[key] = message;
                return acc;
            }, {} as Errors);
            throw new BadRequestException(errors);
        }
        c.req.addValidatedData('param', result.data);
    });
};

const validateQuery = <T extends ZodSchema>(schema: T) => {
    return zValidator('query', schema, (result, c) => {
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                const key = issue.path[0];
                const message = issue.message;
                if (key && !acc[key]) acc[key] = message;
                return acc;
            }, {} as Errors);
            throw new BadRequestException(errors);
        }
        c.req.addValidatedData('query', result.data);
    });
};

export { validateBody, validateParams, validateQuery };
