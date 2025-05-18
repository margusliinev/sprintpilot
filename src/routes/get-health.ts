import { Hono } from 'hono';

const app = new Hono().get('/', (c) => {
    return c.json({ success: true, message: 'OK' });
});

export default app;
