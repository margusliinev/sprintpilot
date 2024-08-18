import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is required', invalid_type_error: 'Username is invalid' })
        .min(3, { message: 'Username must be between 3 and 39 characters' })
        .max(39, { message: 'Username must be between 3 and 39 characters' })
        .regex(/^[^-].*[^-]$/, { message: 'Username cannot start or end with a hyphen' })
        .regex(/^(?!.*--).*$/, { message: 'username cannot have multiple consecutive hyphens' })
        .regex(/^[a-zA-Z0-9-]+$/, { message: 'Username can only contain letters (A-Z), numbers (0-9), and hyphens (-)' }),
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z
        .string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/.*\d.*/, { message: 'Password must contain at least one number' })
        .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
});

export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' })
});

export type registerDto = z.infer<typeof registerSchema>;
export type loginDto = z.infer<typeof loginSchema>;
