import { userRepository } from './users.repository';
import { NotFoundException } from '../../utils';
import { authenticate } from '../../middleware';
import { Hono } from 'hono';

const app = new Hono();

app.use(authenticate);

app.get('/me', async (c) => {
    const userId = c.get('user').id;

    const user = await userRepository.getUserById(userId);
    if (!user) throw new NotFoundException();

    return c.json({ success: true, data: user });
});

export default app;
