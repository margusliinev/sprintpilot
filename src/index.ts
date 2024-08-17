import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT is not defined');

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

console.log('Server is running on port', PORT);

serve({ fetch: app.fetch, port: Number(PORT) });
