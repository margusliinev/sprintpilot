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

const ANSI_COLORS = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    reset: '\x1b[0m',
};

const getColor = (status: number) => {
    if (status >= 500) return ANSI_COLORS.red;
    if (status >= 400) return ANSI_COLORS.yellow;
    return ANSI_COLORS.green;
};

export class RequestLogger {
    private formatLogMessage(logData: RequestLog) {
        const { method, path, status, duration } = logData;

        const color = getColor(status);
        const coloredStatus = `${color}${status}${ANSI_COLORS.reset}`;
        const coloredMethod = `${color}${method}${ANSI_COLORS.reset}`;

        return `${coloredMethod} ${path} - ${coloredStatus} ${duration}ms`;
    }

    log(requestLog: RequestLog) {
        if (env.ENV === 'dev') {
            console.log(this.formatLogMessage(requestLog));
        } else {
            console.log(JSON.stringify(requestLog));
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
