import { getCookie, deleteCookie, UnauthorizedException } from '../utils';
import { userRepository } from '../modules/users/users.repository';
import { createMiddleware } from 'hono/factory';

export const authenticate = createMiddleware(async (c, next) => {
    const session = await getCookie(c, '__session');
    if (!session) throw new UnauthorizedException();

    const user = await userRepository.getUserBySessionId(session.id);
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
