import { createMiddleware } from 'hono/factory';
import { Logger } from '../helpers/logger';
import { models } from '../models';

const bootstrapMiddleware = createMiddleware(async (ctx, next) => {
    const start = performance.now();
    const method = ctx.req.method;
    const path = ctx.req.path;
    const userAgent = ctx.req.header('User-Agent') || 'unknown';
    const referer = ctx.req.header('Referer') || 'unknown';
    const requestId = ctx.get('requestId');

    ctx.set('log', new Logger(requestId));
    ctx.set('models', models);

    await next();

    const end = performance.now();
    const duration = (end - start).toFixed(3);
    const status = ctx.res.status;
    const message = 'HTTP Request';

    const logData = {
        method,
        path,
        userAgent,
        referer,
        requestId,
        status,
        duration,
        message,
    };

    ctx.var.log.request(logData);
});

export default bootstrapMiddleware;
