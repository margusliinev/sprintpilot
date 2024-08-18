import { defaultCookieOptions, validate } from '../../utils';
import { deleteCookie, setSignedCookie } from 'hono/cookie';
import { loginSchema, registerSchema } from './auth.schema';
import { authService } from './auth.service';
import { env } from '../../config';
import { Hono } from 'hono';

const app = new Hono();

app.post('/register', validate('json', registerSchema), async (c) => {
    const body = c.req.valid('json');

    const session = await authService.register(body);
    await setSignedCookie(c, '__session', String(session.id), env.SESSION_SECRET, defaultCookieOptions);

    return c.json({ success: true, message: 'Register successful' }, 201);
});

app.post('/login', validate('json', loginSchema), async (c) => {
    const body = c.req.valid('json');

    const session = await authService.login(body);
    await setSignedCookie(c, '__session', String(session.id), env.SESSION_SECRET, defaultCookieOptions);

    return c.json({ success: true, message: 'Login successful' }, 201);
});

app.post('/logout', async (c) => {
    deleteCookie(c, '__session');
    return c.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
