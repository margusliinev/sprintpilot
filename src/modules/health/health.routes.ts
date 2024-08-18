import { Hono } from 'hono';

const app = new Hono();

app.get('/ok', async (c) => c.json({ success: true, message: 'OK' }));

export default app;
