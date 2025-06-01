import { authService } from '../features/auth/auth.service';
import { UnauthorizedException } from '../helpers/errors';
import { createMiddleware } from 'hono/factory';

const authMiddleware = createMiddleware(async (ctx, next) => {
    const sessionToken = await authService.getSessionTokenCookie(ctx);
    if (!sessionToken) throw new UnauthorizedException();

    const { session, user } = await authService.validateSessionToken(ctx, sessionToken);
    if (!session || !user) {
        authService.deleteSessionTokenCookie(ctx);
        throw new UnauthorizedException();
    }

    await authService.setSessionTokenCookie(ctx, sessionToken, session.expires_at);

    ctx.set('session', session);
    ctx.set('user', user);

    await next();
});

export default authMiddleware;
