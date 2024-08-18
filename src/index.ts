import HealthRoutes from './modules/health/health.controller';
import AuthRoutes from './modules/auth/auth.controller';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { BadRequestException } from './config/errors';
import { HTTPException } from 'hono/http-exception';
import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config';

const app = new Hono();

app.use(trimTrailingSlash());

app.route('/api/health', HealthRoutes);
app.route('/api/auth', AuthRoutes);

app.notFound(async (c) => c.json({ success: false, message: 'Not Found' }, 404));
app.onError(async (err, c) => {
    if (err instanceof BadRequestException) {
        return c.json({ success: false, message: err.message, errors: [err.error] }, err.status);
    } else if (err instanceof HTTPException) {
        return c.json({ success: false, message: err.message }, err.status);
    } else {
        return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
});

showRoutes(app, { colorize: true });
serve({ fetch: app.fetch, port: env.PORT });

console.log('Server is running on port', env.PORT);
