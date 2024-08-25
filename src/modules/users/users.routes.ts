import { deleteCookie, NotFoundException } from '../../utils';
import { usersRepository } from './users.repository';
import { Hono } from 'hono';

const app = new Hono();

app.get('/me', async (c) => {
    const userId = c.get('user').id;

    const user = await usersRepository.getUserById(userId);
    if (!user) throw new NotFoundException();

    return c.json({ success: true, data: user });
});

app.delete('/me/sessions', async (c) => {
    deleteCookie(c, '__session');

    const userId = c.get('user').id;
    await usersRepository.deleteUserSessions(userId);

    return c.json({ success: true, message: 'Deleted all user sessions' }, 200);
});

export default app;
