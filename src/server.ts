import { healthHandler, registerHandler, loginHandler, logoutHandler, getCurrentUserHandler, deleteCurrentUserSessionsHandler } from './handlers/index.ts';
import { handleError, handleNotFound, env } from './helpers/index.ts';
import { logger, auth } from './middleware/index.ts';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { serve } from '@hono/node-server';
import { showRoutes } from 'hono/dev';
import { Hono } from 'hono';

export const app = new Hono()
    .basePath('/api')
    .use(trimTrailingSlash())
    .use(secureHeaders())
    .use(requestId())
    .use(logger())
    .use(auth())
    .get('/health', ...healthHandler)
    .post('/auth/register', ...registerHandler)
    .post('/auth/login', ...loginHandler)
    .post('/auth/logout', ...logoutHandler)
    .get('/users/me', ...getCurrentUserHandler)
    .delete('/users/me/sessions', ...deleteCurrentUserSessionsHandler)
    .notFound(handleNotFound)
    .onError(handleError);

if (env.NODE_ENV === 'development') showRoutes(app, { colorize: true });
if (env.NODE_ENV !== 'test') {
    serve({ fetch: app.fetch, port: env.PORT });
    console.log(`Server is running on port ${env.PORT}`);
}
