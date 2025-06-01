import { z } from 'zod/v4';

const registerSchema = z.object({
    name: z.string({ error: 'Name is invalid' }).min(2, { error: 'Name must be at least 2 characters' }).max(50, { error: 'Name must be at most 50 characters' }),
    email: z.email({ error: 'Email is invalid' }),
    password: z
        .string({ error: 'Password is invalid' })
        .min(8, { error: 'Password must be at least 8 characters' })
        .max(255, { error: 'Password must be at most 255 characters' })
        .regex(/.*\d.*/, { error: 'Password must contain at least one number' })
        .regex(/.*[A-Za-z].*/, { error: 'Password must contain at least one letter' }),
});

const loginSchema = z.object({
    email: z.email({ error: 'Email is invalid' }),
    password: z.string({ error: 'Password is invalid' }),
});

export { registerSchema, loginSchema };
