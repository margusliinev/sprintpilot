import { z, ZodError } from 'zod';

const envSchema = z.object({
    ENV: z.union([z.literal('dev'), z.literal('live')]),
    PORT: z.coerce.number(),
    SESSION_SECRET: z.string().min(32),
    DATABASE_URL: z.string(),
});

try {
    envSchema.parse(Bun.env);
} catch (error) {
    if (error instanceof ZodError) {
        const errors = error.errors.map((err) => err.path[0]).join(', ');
        console.error('Missing/Invalid environment variables:', errors);
    }
    process.exit(1);
}

export const env = envSchema.parse(Bun.env);
