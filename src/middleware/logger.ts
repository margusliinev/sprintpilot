import { createMiddleware } from 'hono/factory';

export const logger = () =>
    createMiddleware(async (c, next) => {
        const start = Date.now();

        const userAgent = c.req.header('User-Agent');
        const referrer = c.req.header('Referrer');

        await next();

        const end = Date.now();
        const duration = `Duration: ${end - start}ms`;

        const method = `Method: ${c.req.method}`;
        const path = `Path: ${c.req.path}`;
        const status = `Status: ${c.res.status}`;

        const requestId = c.get('requestId');
        const sessionId = c.get('session')?.id;
        const userId = c.get('user')?.id;

        const logValues = [
            method,
            path,
            status,
            requestId && `Request ID: ${requestId}`,
            sessionId && `Session ID: ${sessionId}`,
            userId && `User ID: ${userId}`,
            userAgent && `User-Agent: ${userAgent}`,
            referrer && `Referrer: ${referrer}`,
            duration
        ]
            .filter(Boolean)
            .join(' | ');

        const logMessage = `<-- ${logValues} -->`;

        if (c.res.status >= 200 && c.res.status < 400) {
            console.info(`\x1b[32m${logMessage}\x1b[0m`);
        } else if (c.res.status >= 400 && c.res.status < 500) {
            console.warn(`\x1b[33m${logMessage}\x1b[0m`);
        } else {
            console.error(`\x1b[31m${logMessage}\x1b[0m`);
        }
    });
