import { deleteSessionTokenCookie, getSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from '../helpers/auth';
import { UnauthorizedException } from '../helpers/errors';
import { createMiddleware } from 'hono/factory';

const publicRoutes = [
    { path: '/api/health/ok', method: 'GET' },
    { path: '/api/auth/register', method: 'POST' },
    { path: '/api/auth/login', method: 'POST' },
] as const;

const authMiddleware = () =>
    createMiddleware(async (c, next) => {
        const isPublic = publicRoutes.some((route) => route.path === c.req.path && route.method === c.req.method);
        if (isPublic) return await next();

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
