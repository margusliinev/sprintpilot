import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ invalid_type_error: 'Email is invalid' }).min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
    password: z.string({ invalid_type_error: 'Password is invalid' }).min(1, { message: 'Password is required' }),
});

export type loginDto = z.infer<typeof loginSchema>;
