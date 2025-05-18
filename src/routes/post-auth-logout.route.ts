import { deleteSessionTokenCookie, invalidateSession, UnauthorizedException } from '../helpers/index.ts';
import { Hono } from 'hono';

const app = new Hono().post('/', async (c) => {
    const session = c.get('session');
    if (!session) throw new UnauthorizedException();

    await invalidateSession(session.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
