import { CustomException } from '../helpers/errors';
import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory';
import { env } from '../helpers/env';
import { Context } from 'hono';
import winston from 'winston';

const { combine, timestamp, colorize, printf, json } = winston.format;

const upperCase = winston.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
});

const devFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    upperCase(),
    colorize(),
    printf(({ timestamp, level, message, errors, stack }) => {
        const messageWithErrors = errors
            ? `${message} - ${Object.entries(errors)
                  .map(([_, value]) => value)
                  .join(' || ')}`
            : message;
        const formattedStack = stack ? `\n\n${stack}\n` : '';

        return `${timestamp} ${level} - ${messageWithErrors} ${formattedStack}`;
    }),
);

const liveFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json());

const loggerInstance = winston.createLogger({
    format: env.ENV === 'dev' ? devFormat : liveFormat,
    transports: [new winston.transports.Console()],
});

export class Logger {
    private context: Context;

    constructor(c: Context) {
        this.context = c;
    }

    private log(level: string, message: string, meta?: Record<string, unknown>) {
        const requestId = this.context.get('requestId');
        const sessionId = this.context.get('session')?.id;
        const userId = this.context.get('user')?.id;

        const logData = {
            requestId,
            sessionId,
            userId,
            ...meta,
        };

        loggerInstance.log(level, message, logData);
    }

    error(error: CustomException | HTTPException | Error) {
        const message = error.message;
        const status = error instanceof HTTPException ? error.status : 500;
        const errors = error instanceof CustomException ? error.errors : undefined;
        const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
        const stack = status >= 500 ? error.stack : undefined;
        const meta = { errors, stack };

        this.log(level, message, meta);
    }

    warn(message: string, meta?: Record<string, unknown>) {
        this.log('warn', message, meta);
    }

    info(message: string, meta?: Record<string, unknown>) {
        this.log('info', message, meta);
    }

    logRequest(start: number, end: number) {
        const userAgent = this.context.req.header('User-Agent');
        const referrer = this.context.req.header('Referrer');
        const method = this.context.req.method;
        const path = this.context.req.path;
        const duration = (end - start).toFixed(3);
        const status = this.context.res.status;

        const logData = {
            userAgent,
            referrer,
            method,
            path,
            duration,
            status,
        };

        const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
        const message = `${method} ${path} - ${status} ${duration}ms`;

        this.log(level, message, logData);
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
