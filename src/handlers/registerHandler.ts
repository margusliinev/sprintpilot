import { BadRequestException, createSession, generateSessionToken, hashPassword, InternalServerErrorException, setSessionTokenCookie, validateBody } from '../helpers/index.ts';
import { createNewUser, getUserByEmail } from '../queries/users.ts';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

const factory = createFactory();

const registerSchema = z.object({
    name: z
        .string({ required_error: 'Name is required', invalid_type_error: 'Name is invalid' })
        .min(2, { message: 'Name must be between 2 and 50 characters' })
        .max(50, { message: 'Name must be between 2 and 50 characters' }),
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z
        .string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(255, { message: 'Password must be at most 255 characters' })
        .regex(/.*\d.*/, { message: 'Password must contain at least one number' })
        .regex(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' }),
});

export const registerHandler = factory.createHandlers(validateBody(registerSchema), async (c) => {
    const body = c.req.valid('json');

    const existingEmail = await getUserByEmail(body.email);
    if (existingEmail) throw new BadRequestException({ email: 'Email already exists' });

    const hashedPassword = await hashPassword(body.password);

    const newUser = await createNewUser({ ...body, password: hashedPassword });
    if (!newUser) throw new InternalServerErrorException();

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, newUser.id);
    if (!session) throw new InternalServerErrorException();

    await setSessionTokenCookie(c, sessionToken, session.expires_at);

    return c.json({ success: true, message: 'Register successful' }, 201);
});
