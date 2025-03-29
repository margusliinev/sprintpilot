import { createMiddleware } from 'hono/factory';
import { env } from '../helpers/env';

type RequestLog = {
    requestId: string;
    userAgent?: string;
    referrer?: string;
    method: string;
    path: string;
    duration: string;
    status: number;
    sessionId?: string;
    userId?: number;
};

export class RequestLogger {
    private formatLogMessage(logData: RequestLog): string {
        const { method, path, status, duration } = logData;
        const statusColor = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
        const resetColor = '\x1b[0m';

        return `${method} ${path} - ${statusColor}${status}${resetColor} (${duration}ms)`;
    }

    log(requestLog: RequestLog) {
        if (env.ENV === 'live') {
            console.log(JSON.stringify(requestLog));
        } else {
            console.log(this.formatLogMessage(requestLog));
        }
    }
}

export const logger = () =>
    createMiddleware(async (c, next) => {
        const start = performance.now();
        const requestId = c.get('requestId');
        const userAgent = c.req.header('User-Agent');
        const referrer = c.req.header('Referrer');
        const method = c.req.method;
        const path = c.req.path;

        await next();

        const end = performance.now();
        const duration = (end - start).toFixed(3);
        const status = c.res.status;
        const sessionId = c.get('session')?.id;
        const userId = c.get('user')?.id;

        const requestLog: RequestLog = {
            requestId,
            userAgent,
            referrer,
            method,
            path,
            duration,
            status,
            sessionId,
            userId,
        };

        const requestLogger = new RequestLogger();
        requestLogger.log(requestLog);
    });
