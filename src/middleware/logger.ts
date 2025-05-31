import { createMiddleware } from 'hono/factory';
import { Logger } from '../helpers/logger';

const loggerMiddleware = createMiddleware(async (c, next) => {
    const start = performance.now();
    const method = c.req.method;
    const path = c.req.path;
    const userAgent = c.req.header('User-Agent') || 'unknown';
    const referer = c.req.header('Referer') || 'unknown';
    const requestId = c.get('requestId');

    c.set('log', new Logger(requestId));

    await next();

    const end = performance.now();
    const duration = (end - start).toFixed(3);
    const status = c.res.status;
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

    c.var.log.request(logData);
});

export default loggerMiddleware;
