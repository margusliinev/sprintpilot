import { deleteSessionTokenCookie, getSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from '../helpers/index.ts';
import { createMiddleware } from 'hono/factory';

const authMiddleware = () =>
    createMiddleware(async (c, next) => {
        const sessionToken = await getSessionTokenCookie(c);
        if (!sessionToken) {
            c.set('user', null);
            c.set('session', null);
            return await next();
        }

        const { user, session } = await validateSessionToken(sessionToken);
        if (!user || !session) {
            c.set('user', null);
            c.set('session', null);
            deleteSessionTokenCookie(c);
            return await next();
        }

        await setSessionTokenCookie(c, sessionToken, session.expires_at);

        c.set('user', user);
        c.set('session', session);

        await next();
    });

export default authMiddleware;
