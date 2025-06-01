import { authService } from '../auth/auth.service';
import { auth } from '../../middleware';
import { Hono } from 'hono';

const app = new Hono().use(auth);

app.get('/me', (ctx) => {
    const user = ctx.get('user');

    return ctx.json({ success: true, data: user });
});

app.delete('/me/sessions', async (ctx) => {
    const user = ctx.get('user');

    await authService.invalidateUserSessions(ctx, user.id);
    authService.deleteSessionTokenCookie(ctx);

    return ctx.json({ success: true, message: 'Sessions revoked successfully' }, 200);
});

export default app;
