import { Hono } from 'hono';

const app = new Hono();

app.get('/ok', async (c) => {
    c.log.info('Performed Healthcheck');
    return c.json({ success: true, message: 'OK' });
});

export default app;
