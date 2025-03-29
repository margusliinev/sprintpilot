import { validate } from '../middleware';
import { Hono } from 'hono';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string({ message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is invalid' }),
});

const app = new Hono();

app.get('/', async (c) => {
    return c.json({ success: true, data: 'All Users' });
});

app.post('/', validate('json', userSchema), async (c) => {
    const { name, email } = c.req.valid('json');
    return c.json({ success: true, data: { name, email } });
});

export default app;
