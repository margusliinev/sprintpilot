import { HttpLogger, ErrorLogger } from '../utils';
import { createMiddleware } from 'hono/factory';

export const logger = () =>
    createMiddleware(async (c, next) => {
        const start = Date.now();
        const requestId = c.get('requestId');
        const userAgent = c.req.header('User-Agent');
        const referrer = c.req.header('Referrer');
        const method = `Method: ${c.req.method}`;
        const path = `Path: ${c.req.path}`;

        c.errorLogger = new ErrorLogger(requestId);

        await next();

        const end = Date.now();
        const duration = `Duration: ${end - start}ms`;
        const status = `Status: ${c.res.status}`;
        const sessionId = c.get('session')?.id;
        const userId = c.get('user')?.id;

        const httpLogValues = [
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

        const httpLogger = new HttpLogger();
        httpLogger.logByStatus(c.res.status, httpLogValues);
    });
