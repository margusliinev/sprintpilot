import { Hono } from 'hono';

const app = new Hono();

app.get('/ok', (c) => {
    return c.json({ success: true, message: 'OK' });
});

export default app;
