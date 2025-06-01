import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '../../helpers/errors';
import { registerSchema, loginSchema } from './auth.schema';
import { validateBody } from '../../helpers/validation';
import { userService } from '../users/users.service';
import { authService } from './auth.service';
import { auth } from '../../middleware';
import { Hono } from 'hono';

const app = new Hono();

app.post('/register', validateBody(registerSchema), async (ctx) => {
    const body = ctx.req.valid('json');
    const normalizedEmail = body.email.trim().toLowerCase();

    const [existingEmail] = await userService.getUserByEmail(ctx, normalizedEmail);
    if (existingEmail) throw new BadRequestException({ email: 'Email already exists' });

    const hashedPassword = await Bun.password.hash(body.password, { algorithm: 'bcrypt' });

    const newUser = await userService.createNewUser(ctx, { ...body, email: normalizedEmail, password: hashedPassword });
    if (!newUser) throw new InternalServerErrorException();

    const session = await authService.createSession(ctx, newUser.id);
    if (!session) throw new InternalServerErrorException();

    await authService.setSessionTokenCookie(ctx, session.id, session.expires_at);

    return ctx.json({ success: true, message: 'Register successful' }, 201);
});

app.post('/login', validateBody(loginSchema), async (ctx) => {
    const body = ctx.req.valid('json');
    const normalizedEmail = body.email.trim().toLowerCase();

    const [user] = await userService.getUserByEmailWithPassword(ctx, normalizedEmail);
    if (!user) throw new UnauthorizedException({ email: 'Invalid email or password' });

    const validPassword = await Bun.password.verify(body.password, user.password, 'bcrypt');
    if (!validPassword) throw new UnauthorizedException({ email: 'Invalid email or password' });

    const session = await authService.createSession(ctx, user.id);
    if (!session) throw new InternalServerErrorException();

    await authService.setSessionTokenCookie(ctx, session.id, session.expires_at);

    return ctx.json({ success: true, message: 'Login successful' }, 200);
});

app.post('/logout', auth, async (ctx) => {
    const session = ctx.get('session');

    await authService.invalidateSession(ctx, session.id);
    authService.deleteSessionTokenCookie(ctx);

    return ctx.json({ success: true, message: 'Logout successful' }, 200);
});

export default app;
