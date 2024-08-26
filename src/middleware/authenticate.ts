import { getCookie, deleteCookie, UnauthorizedException, ErrorLogger } from '../utils';
import { usersRepository } from '../modules/users/users.repository';
import { createMiddleware } from 'hono/factory';

const publicRoutes = [
    { path: '/api/health/ok', method: 'GET' },
    { path: '/api/auth/register', method: 'POST' },
    { path: '/api/auth/login', method: 'POST' },
    { path: '/api/auth/logout', method: 'POST' }
] as const;

export const authenticate = () =>
    createMiddleware(async (c, next) => {
        const isPublic = publicRoutes.some((route) => route.path === c.req.path && route.method === c.req.method);
        if (isPublic) return await next();

        const session = await getCookie(c, '__session');
        if (!session) throw new UnauthorizedException();

        const user = await usersRepository.getUserBySessionId(session.id);
        if (!user || !user.id || !session.id) {
            deleteCookie(c, '__session');
            throw new UnauthorizedException();
        }

        const requestId = c.get('requestId');
        const contextSession = { id: session.id };
        const contextUser = { id: user.id };

        c.set('session', contextSession);
        c.set('user', contextUser);

        c.errorLogger = new ErrorLogger(requestId, contextSession.id, contextUser.id);

        await next();
    });
