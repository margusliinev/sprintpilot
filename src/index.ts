import { HealthRouter, UsersRouter, AuthRouter } from './routes';
import { handleNotFound, handleError } from './helpers/errors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { auth, logger } from './middleware';
import { requestId } from 'hono/request-id';
import { showRoutes } from 'hono/dev';
import { env } from './helpers/env';
import { csrf } from 'hono/csrf';
import { Hono } from 'hono';
import { serve } from 'bun';

const app = new Hono();

app.use(trimTrailingSlash());
app.use(secureHeaders());
app.use(requestId());
app.use(csrf());
app.use(logger());
app.use(auth());

app.route('/api/health', HealthRouter);
app.route('/api/users', UsersRouter);
app.route('/api/auth', AuthRouter);

app.notFound(handleNotFound);
app.onError(handleError);

if (env.ENV === 'dev') showRoutes(app, { colorize: true });

const server = serve({ fetch: app.fetch, port: env.PORT });
console.log(`Server is running on port ${server.port}`);
