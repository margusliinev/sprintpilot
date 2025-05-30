import { deleteSessionTokenCookie, invalidateUserSessions } from '../helpers/auth';
import { auth } from '../middleware';
import { Hono } from 'hono';

const app = new Hono().use(auth);

app.get('/me', (c) => {
    const user = c.get('user');

    return c.json({ success: true, data: user });
});

app.delete('/me/sessions', async (c) => {
    const user = c.get('user');

    await invalidateUserSessions(user.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Sessions revoked successfully' }, 200);
});

export default app;
