import { UnauthorizedException } from '../helpers/index.ts';
import { Hono } from 'hono';

const app = new Hono().get('/', (c) => {
    const user = c.get('user');
    if (!user) throw new UnauthorizedException();

    return c.json({ success: true, data: user });
});

export default app;
