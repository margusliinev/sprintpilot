import { createMiddleware } from 'hono/factory';
import { Logger } from '../helpers/logging';

export const logger = () =>
    createMiddleware(async (c, next) => {
        const start = performance.now();
        c.logger = new Logger(c);

        await next();

        const end = performance.now();
        c.logger.logRequest(start, end);
    });
