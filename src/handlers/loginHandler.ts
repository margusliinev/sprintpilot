import { BadRequestException, createSession, generateSessionToken, InternalServerErrorException, setSessionTokenCookie, validateBody, verifyPassword } from '../helpers/index.ts';
import { getUserByEmailWithPassword } from '../queries/users.ts';
import { createFactory } from 'hono/factory';
import { z } from 'zod';

const factory = createFactory();

const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email is invalid' }).email({ message: 'Email is invalid' }),
    password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password is invalid' }),
});

export const loginHandler = factory.createHandlers(validateBody(loginSchema), async (c) => {
    const body = c.req.valid('json');

    const user = await getUserByEmailWithPassword(body.email);
    if (!user) throw new BadRequestException({ email: 'Invalid email or password' });

    const validPassword = await verifyPassword(user.password, body.password);
    if (!validPassword) throw new BadRequestException({ email: 'Invalid email or password' });

    const sessionToken = generateSessionToken();

    const session = await createSession(sessionToken, user.id);
    if (!session) throw new InternalServerErrorException();

    await setSessionTokenCookie(c, sessionToken, session.expires_at);

    return c.json({ success: true, message: 'Login successful' }, 200);
});
