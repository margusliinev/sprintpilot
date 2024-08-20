import { getCookie, deleteCookie, UnauthorizedException } from '../utils';
import { userRepository } from '../modules/users/users.repository';
import { createMiddleware } from 'hono/factory';

export const authenticate = createMiddleware(async (c, next) => {
    const session = await getCookie(c, '__session');
    if (!session) throw new UnauthorizedException();

    const user = await userRepository.getUserBySessionId(Number(session));
    if (!user) {
        deleteCookie(c, '__session');
        throw new UnauthorizedException();
    }

    const contextUser = { id: user.id };

    c.set('user', contextUser);
    await next();
});
