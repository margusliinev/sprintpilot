import { handleNotFound, handleError, env } from './helpers';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { showRoutes } from 'hono/dev';
import { requestId } from 'hono/request-id';
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
