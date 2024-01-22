import { formatErrors } from '@/utils/formatErrors';
import { z, ZodError } from 'zod';

const registerSchema = z.object({
    username: z
        .string({ invalid_type_error: 'Username is invalid', required_error: 'Username is required' })
        .min(3, { message: 'Username must be between 3 and 39 characters' })
        .max(39, { message: 'Username must be between 3 and 39 characters' })
        .regex(/^[^-].*[^-]$/, { message: 'Username cannot start or end with a hyphen' })
        .regex(/^[a-zA-Z0-9-]+$/, { message: 'Username can only contain letters (A-Z), numbers (0-9), and hyphens (-)' }),
    email: z.string({ invalid_type_error: 'Email is invalid', required_error: 'Email is required' }).email({ message: 'Email is invalid' }),
    password: z
        .string({ invalid_type_error: 'Password is invalid', required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/.*\d.*/, { message: 'Password must contain at least one number' })
        .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' }),
});

export async function registerValidation(request: Request) {
    const formData = Object.fromEntries(await request.formData());
    try {
        const data = registerSchema.parse(formData);
        return { success: true, body: data };
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatErrors(error);
            return { success: false, errors };
        }
        return { success: false, errors: { default: 'Validation failed' } };
    }
}
