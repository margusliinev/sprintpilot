import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string({ required_error: 'Name is required', invalid_type_error: 'Name is invalid' })
        .min(2, { message: 'Name must be between 2 and 50 characters' })
        .max(50, { message: 'Name must be between 2 and 50 characters' }),
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z
        .string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/.*\d.*/, { message: 'Password must contain at least one number' })
        .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' }),
});

export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' }),
});

export type registerDto = z.infer<typeof registerSchema>;
export type loginDto = z.infer<typeof loginSchema>;
