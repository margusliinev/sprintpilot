import { createMiddleware } from 'hono/factory';
import { logger } from '../helpers/logger';

const loggerMiddleware = () =>
    createMiddleware(async (c, next) => {
        const start = performance.now();
        const method = c.req.method;
        const path = c.req.path;
        const userAgent = c.req.header('User-Agent') || 'unknown';
        const referer = c.req.header('Referer') || 'unknown';
        const requestId = c.get('requestId');

        c.log = logger.child({ requestId });

        await next();

        const end = performance.now();
        const duration = (end - start).toFixed(3);
        const status = c.res.status;

        const logData = {
            method,
            path,
            userAgent,
            referer,
            requestId,
            status,
            duration,
        };

        const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
        logger[level]('HTTP Request', logData);
    });

export default loggerMiddleware;
