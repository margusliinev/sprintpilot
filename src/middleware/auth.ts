import { getSessionTokenCookie, validateSessionToken, deleteSessionTokenCookie, setSessionTokenCookie } from '../helpers/auth';
import { UnauthorizedException } from '../helpers/errors';
import { createMiddleware } from 'hono/factory';

const authMiddleware = createMiddleware(async (c, next) => {
    const sessionToken = await getSessionTokenCookie(c);
    if (!sessionToken) throw new UnauthorizedException();

    const { user, session } = await validateSessionToken(sessionToken);
    if (!user || !session) {
        deleteSessionTokenCookie(c);
        throw new UnauthorizedException();
    }

    await setSessionTokenCookie(c, sessionToken, session.expires_at);

    c.set('user', user);
    c.set('session', session);

    await next();
});

export default authMiddleware;
