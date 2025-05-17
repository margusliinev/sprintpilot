import { deleteSessionTokenCookie, invalidateSession } from '../helpers/index.ts';
import { createFactory } from 'hono/factory';

const factory = createFactory();

export const logoutHandler = factory.createHandlers(async (c) => {
    const session = c.get('session');

    await invalidateSession(session.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Logout successful' }, 200);
});
