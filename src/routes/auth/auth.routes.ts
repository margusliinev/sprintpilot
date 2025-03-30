import { registerSchema, loginSchema } from './auth.schema';
import { deleteSessionTokenCookie, invalidateSession, setSessionTokenCookie } from '../../helpers/auth';
import { authService } from './auth.service';
import { validate } from '../../middleware';
import { Hono } from 'hono';

const app = new Hono();

app.post('/register', validate('json', registerSchema), async (c) => {
    const body = c.req.valid('json');

    const { sessionToken, session } = await authService.register(body);
    setSessionTokenCookie(c, sessionToken, session.expires_at);

    return c.json({ success: true, message: 'Register successful' }, 201);
});

app.post('/login', validate('json', loginSchema), async (c) => {
    const body = c.req.valid('json');

    const { sessionToken, session } = await authService.login(body);
    setSessionTokenCookie(c, sessionToken, session.expires_at);

    return c.json({ success: true, message: 'Login successful' }, 200);
});

app.post('/logout', async (c) => {
    const session = c.get('session');

    await invalidateSession(session.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
