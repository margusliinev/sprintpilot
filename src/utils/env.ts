import { z, ZodError } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
    COOKIE_SECRET: z.string(),
    ENCRYPTION_SECRET: z.string(),
    ENCRYPTION_SALT: z.string(),
    DATABASE_URL: z.string()
});

try {
    envSchema.parse(process.env);
} catch (error) {
    if (error instanceof ZodError) {
        const errors = error.errors.map((err) => err.path[0]).join(', ');
        console.error('Missing environment variables:', errors);
    }
    process.exit(1);
}

export const env = envSchema.parse(process.env);
