import { getCookie, deleteCookie, UnauthorizedException } from '../utils';
import { usersRepository } from '../modules/users/users.repository';
import { createMiddleware } from 'hono/factory';

const publicRoutes = [
    { path: '/api/health/ok', method: 'GET' },
    { path: '/api/auth/register', method: 'POST' },
    { path: '/api/auth/login', method: 'POST' },
    { path: '/api/auth/logout', method: 'POST' }
] as const;

export const authenticate = createMiddleware(async (c, next) => {
    const isPublic = publicRoutes.some((route) => route.path === c.req.path && route.method === c.req.method);
    if (isPublic) return await next();

    const session = await getCookie(c, '__session');
    if (!session) throw new UnauthorizedException();

    const user = await usersRepository.getUserBySessionId(session.id);
    if (!user) {
        deleteCookie(c, '__session');
        throw new UnauthorizedException();
    }

    const contextUser = { id: user.id };
    const contextSession = { id: session.id };

    c.set('user', contextUser);
    c.set('session', contextSession);
    await next();
});
