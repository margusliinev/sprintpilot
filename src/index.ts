import { handleNotFound, handleError } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { validate } from './middleware';
import { showRoutes } from 'hono/dev';
import { env } from './helpers/env';
import { csrf } from 'hono/csrf';
import { Hono } from 'hono';
import { serve } from 'bun';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string({ message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string({ message: 'Email is required' }).email({ message: 'Email is invalid' }),
});

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(csrf());

app.get('/', (c) => {
    return c.json({ success: true, data: 'OK' });
});

app.post('/', validate('json', userSchema), (c) => {
    const { name, email } = c.req.valid('json');

    return c.json({ success: true, data: { name, email } });
});

app.notFound(handleNotFound);
app.onError(handleError);

showRoutes(app, { colorize: true });
export const server = serve({ fetch: app.fetch, port: env.PORT });
