import { healthRoutes, usersRoutes, authRoutes } from './features';
import { handleError, handleNotFound } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { logger, bootstrap } from './middleware';
import { emitter } from '@hono/event-emitter';
import { requestId } from 'hono/request-id';
import { serveStatic } from 'hono/bun';
import { env } from './helpers/env';
import { handlers } from './events';
import { serve } from 'bun';
import { Hono } from 'hono';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(bootstrap);
app.use(logger);
app.use(emitter(handlers));

app.route('/api/health', healthRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/auth', authRoutes);

app.get('*', serveStatic({ root: './ui/build' }));
app.get('*', serveStatic({ path: './ui/build/index.html' }));

app.notFound(handleNotFound);
app.onError(handleError);

const server = serve({ fetch: app.fetch, port: env.PORT });
console.log(`🚀 Server is running on http://localhost:${server.port}`);
