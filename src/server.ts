import { healthRoutes, usersRoutes, authRoutes } from './routes';
import { handleError, handleNotFound } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { serveStatic } from 'hono/bun';
import { logger } from './middleware';
import { runMigrations } from './db';
import { env } from './helpers/env';
import { serve } from 'bun';
import { Hono } from 'hono';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(logger);
app.use('/*', serveStatic({ root: './ui' }));

app.get('/', serveStatic({ path: 'index.html', root: './ui' }));
app.get('/about', serveStatic({ path: 'about.html', root: './ui' }));

app.route('/api/health', healthRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/auth', authRoutes);

app.notFound(handleNotFound);
app.onError(handleError);

const server = serve({ fetch: app.fetch, port: env.PORT });
if (env.BUN_ENV !== 'test') {
    console.log(`🚀 Server running at http://localhost:${server.port}`);
    runMigrations();
}
