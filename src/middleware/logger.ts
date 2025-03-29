import { CustomException } from '../helpers/errors';
import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory';
import { env } from '../helpers/env';
import { Context } from 'hono';

type RequestLog = {
    requestId: string;
    userAgent: string;
    referrer: string;
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

export class Logger {
    private context: Context;

    constructor(c: Context) {
        this.context = c;
    }

    private devRequestLog(logData: RequestLog) {
        const { method, path, status, duration } = logData;

        const color = getColor(status);
        const coloredStatus = `${color}${status}${ANSI_COLORS.reset}`;
        const coloredMethod = `${color}${method}${ANSI_COLORS.reset}`;

        return `${coloredMethod} ${path} - ${coloredStatus} ${duration}ms`;
    }

    private devLog(logData: Record<string, any>) {
        const { message, errors, stack } = logData;

        const formattedLogMessage = message ? `${message}` : undefined;
        const formattedErrors = errors
            ? Object.entries(errors)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join('\n')
            : undefined;
        const formattedStack = stack ? `${stack.split('\n').slice(1).join('\n')}` : undefined;

        return [formattedLogMessage, formattedErrors, formattedStack].filter((line) => line !== undefined).join('\n');
    }

    private log(additionalData: Record<string, any> = {}) {
        const logEntry = {
            requestId: this.context.get('requestId'),
            sessionId: this.context.get('session')?.id,
            userId: this.context.get('user')?.id,
            ...additionalData,
        };
        if (env.ENV === 'dev') {
            console.log(this.devLog(logEntry));
        } else {
            console.log(JSON.stringify(logEntry));
        }
    }

    error(error: CustomException | HTTPException | Error) {
        const message = error.message;
        const stack = error.stack;
        const status = error instanceof HTTPException ? error.status : 500;
        const errors = error instanceof CustomException ? error.errors : undefined;

        if (status >= 500) {
            this.log({ message, errors, stack });
        } else {
            this.log({ message, errors });
        }
    }

    info(message: string) {
        this.log({ message });
    }

    logRequest(start: number, end: number) {
        const requestId = this.context.get('requestId');
        const userAgent = this.context.req.header('User-Agent') || 'Unknown';
        const referrer = this.context.req.header('Referrer') || 'Unknown';
        const method = this.context.req.method;
        const path = this.context.req.path;
        const duration = (end - start).toFixed(3);
        const status = this.context.res.status;
        const sessionId = this.context.get('session')?.id;
        const userId = this.context.get('user')?.id;

        const logData: RequestLog = {
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

        if (env.ENV === 'dev') {
            console.log(this.devRequestLog(logData));
        } else {
            console.log(JSON.stringify(logData));
        }
    }
}

export const logger = () =>
    createMiddleware(async (c, next) => {
        const start = performance.now();
        c.logger = new Logger(c);

        await next();

        const end = performance.now();
        c.logger.logRequest(start, end);
    });
