import { deleteSessionTokenCookie, invalidateUserSessions, UnauthorizedException } from '../helpers/index.ts';
import { Hono } from 'hono';

const app = new Hono().delete('/', async (c) => {
    const user = c.get('user');
    if (!user) throw new UnauthorizedException();

    await invalidateUserSessions(user.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Sessions revoked successfully' }, 200);
});

export default app;
