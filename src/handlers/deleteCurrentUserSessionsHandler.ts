import { deleteSessionTokenCookie, invalidateUserSessions } from '../helpers/index.ts';
import { createFactory } from 'hono/factory';

const factory = createFactory();

export const deleteCurrentUserSessionsHandler = factory.createHandlers(async (c) => {
    const user = c.get('user');

    await invalidateUserSessions(user.id);
    deleteSessionTokenCookie(c);

    return c.json({ success: true, message: 'Sessions revoked successfully' }, 200);
});
