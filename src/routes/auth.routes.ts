import { createSession, deleteSessionTokenCookie, invalidateSession, setSessionTokenCookie } from '../helpers/auth.ts';
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '../helpers/errors.ts';
import { createNewUser, getUserByEmail, getUserByEmailWithPassword } from '../queries/users.ts';
import { validateBody } from '../helpers/validation.ts';
import { auth } from '../middleware';
import { Hono } from 'hono';
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

const app = new Hono();

app.post('/register', validateBody(registerSchema), async (c) => {
    const body = c.req.valid('json');

    const [existingEmail] = await getUserByEmail(body.email);
    if (existingEmail) throw new BadRequestException({ email: 'Email already exists' });

    const hashedPassword = await Bun.password.hash(body.password, { algorithm: 'bcrypt' });

    const newUser = await createNewUser({ ...body, password: hashedPassword });
    if (!newUser) throw new InternalServerErrorException();

    const session = await createSession(newUser.id);
    if (!session) throw new InternalServerErrorException();

    await setSessionTokenCookie(c, session.id, session.expires_at);

    return c.json({ success: true, message: 'Register successful' }, 201);
});

app.post('/login', validateBody(loginSchema), async (c) => {
    const body = c.req.valid('json');

    const [user] = await getUserByEmailWithPassword(body.email);
    if (!user) throw new UnauthorizedException({ email: 'Invalid email or password' });

    const validPassword = await Bun.password.verify(body.password, user.password, 'bcrypt');
    if (!validPassword) throw new UnauthorizedException({ email: 'Invalid email or password' });

    const session = await createSession(user.id);
    if (!session) throw new InternalServerErrorException();

    await setSessionTokenCookie(c, session.id, session.expires_at);

    return c.json({ success: true, message: 'Login successful' }, 200);
});

app.post('/logout', auth, async (c) => {
    const session = c.get('session');

    await invalidateSession(session.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
