import HealthRoutes from './modules/health/health.routes';
import UsersRoutes from './modules/users/users.routes';
import AuthRoutes from './modules/auth/auth.routes';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';
import { authenticate } from './middleware';
import { showRoutes } from 'hono/dev';
import { requestId } from 'hono/request-id';
import { serve } from '@hono/node-server';
import { csrf } from 'hono/csrf';
import { Hono } from 'hono';
import { env } from './utils';

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(requestId());
app.use(secureHeaders());
app.use(csrf());
app.use(authenticate());

app.route('/api/health', HealthRoutes);
app.route('/api/users', UsersRoutes);
app.route('/api/auth', AuthRoutes);

app.notFound(async (c) => c.json({ success: false, message: 'Not Found' }, 404));
app.onError(async (err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ success: false, message: err.message, errors: err.details ? [err.details] : undefined }, err.status);
    } else {
        return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
});

showRoutes(app, { colorize: true });
export const server = serve({ fetch: app.fetch, port: env.PORT });

console.log('Server is running on port', env.PORT);
