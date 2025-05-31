import { z, ZodError } from 'zod/v4';

const envSchema = z.object({
    PORT: z.coerce.number(),
    BUN_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string(),
    SESSION_SECRET: z.string(),
});

try {
    envSchema.parse(Bun.env);
} catch (error) {
    if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => issue.path[0]).join(', ');
        console.error('Missing/Invalid environment variables:', errors);
    }
    process.exit(1);
}

export const env = envSchema.parse(Bun.env);
