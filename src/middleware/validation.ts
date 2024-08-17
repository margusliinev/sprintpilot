import { zValidator } from '@hono/zod-validator';
import { ZodSchema } from 'zod';

function validate(schema: ZodSchema) {
    return zValidator('json', schema, (result, c) => {
        if (!result.success) {
            const issues = result.error.issues.map((issue) => issue.message);
            const firstIssue = issues[0];
            return c.json({ success: false, message: firstIssue }, 400);
        }
    });
}

export { validate };
