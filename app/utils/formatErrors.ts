import { ZodError } from 'zod';

export function formatErrors(error: ZodError) {
    const { fieldErrors } = error.flatten();
    const errors = Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value ? value[0] : 'Validation Error']));
    return errors;
}
