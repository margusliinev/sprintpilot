import { healthRoutes, usersRoutes, authRoutes } from './routes';
import { handleError, handleNotFound } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { logger } from './middleware';
import { runMigrations } from './db';
import { showRoutes } from 'hono/dev';
import { env } from './helpers/env';
import { Hono } from 'hono';
import { serve } from 'bun';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(logger());

app.route('/api/health', healthRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/auth', authRoutes);

app.notFound(handleNotFound);
app.onError(handleError);

const server = serve({ fetch: app.fetch, port: env.PORT });

if (env.NODE_ENV === 'development') showRoutes(app, { colorize: true });
if (env.NODE_ENV !== 'test') {
    console.log(`🚀 Server running at http://localhost:${server.port}`);
    runMigrations();
}
