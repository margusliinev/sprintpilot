import { validate, setCookie, deleteCookie } from '../../utils';
import { loginSchema, registerSchema } from './auth.schema';
import { authService } from './auth.service';
import { Hono } from 'hono';

const app = new Hono();

app.post('/register', validate('json', registerSchema), async (c) => {
    const body = c.req.valid('json');

    const session = await authService.register(body);
    await setCookie(c, '__session', session.id);

    return c.json({ success: true, message: 'Register successful' }, 201);
});

app.post('/login', validate('json', loginSchema), async (c) => {
    const body = c.req.valid('json');

    const session = await authService.login(body);
    await setCookie(c, '__session', session.id);

    return c.json({ success: true, message: 'Login successful' }, 201);
});

app.post('/logout', async (c) => {
    deleteCookie(c, '__session');
    return c.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
