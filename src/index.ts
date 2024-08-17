import HealthRoutes from './modules/health/health.routes';
import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config';

const app = new Hono();

app.route('/api/health', HealthRoutes);

showRoutes(app, { colorize: true });
serve({ fetch: app.fetch, port: env.PORT });

console.log('Server is running on port', env.PORT);
