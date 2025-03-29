import { handleNotFound, handleError } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { showRoutes } from 'hono/dev';
import { env } from './helpers/env';
import { csrf } from 'hono/csrf';
import { Hono } from 'hono';
import { serve } from 'bun';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(csrf());

app.get('/', (c) => {
    return c.json({ message: 'Hello World' });
});

app.notFound(handleNotFound);
app.onError(handleError);

showRoutes(app, { colorize: true });
export const server = serve({ fetch: app.fetch, port: env.PORT });
