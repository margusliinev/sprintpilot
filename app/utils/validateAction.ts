import type { ZodError, ZodSchema } from 'zod';

export async function validateAction<ActionInput>({ request, schema }: { request: Request; schema: ZodSchema }) {
    const body = Object.fromEntries(await request.formData());

    try {
        const formData = schema.parse(body) as ActionInput;
        return { formData, errors: null };
    } catch (error) {
        const { fieldErrors } = (error as ZodError).flatten();
        const errors = Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => {
                if (value && value[0]) {
                    return [key, value[0]];
                }
                return [key, `${key[0]?.toUpperCase() + key.slice(1)} is invalid`];
            }),
        );
        return { formData: null, errors };
    }
}
