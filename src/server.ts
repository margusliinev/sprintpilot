import { healthRoutes, usersRoutes, authRoutes } from './features';
import { handleError, handleNotFound } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { bootstrap } from './middleware';
import { serveStatic } from 'hono/bun';
import { runMigrations } from './db';
import { runCrons } from './crons';
import { env } from './helpers/env';
import { serve } from 'bun';
import { Hono } from 'hono';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(bootstrap);
app.use('*', serveStatic({ root: './build/ui' }));

app.route('/api/health', healthRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/auth', authRoutes);

app.notFound(handleNotFound);
app.onError(handleError);

const server = serve({ fetch: app.fetch, port: env.PORT });
if (env.NODE_ENV !== 'test') {
    console.log(`🚀 Server running at http://localhost:${server.port}`);
    runMigrations();
    runCrons();
}
