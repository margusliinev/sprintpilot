import type { Errors } from './errors';
import { env } from './env';

type Level = 'info' | 'warn' | 'error';
type Meta = Record<string, any>;
type ErrorExtended = Error & { errors?: Errors };
type HTTPRequest = {
    method: string;
    path: string;
    userAgent: string;
    referer: string;
    status: number;
    duration: string;
    message: string;
};

export class Logger {
    private requestId: string;

    constructor(requestId: string) {
        this.requestId = requestId;
    }

    private log(level: Level, message: string, meta?: Meta, error?: ErrorExtended) {
        const logData = {
            requestId: this.requestId,
            timestamp: new Date().toISOString(),
            level,
            message,
            ...meta,
            ...(error?.message && { message: error.message }),
            ...(error?.errors && { errors: error.errors }),
            ...(error?.stack && level === 'error' && { stack: error.stack }),
        };
        if (env.NODE_ENV === 'development') console.log(logData);
        if (env.NODE_ENV === 'production') console.log(JSON.stringify(logData));
    }

    info(message: string, meta?: Meta) {
        this.log('info', message, meta);
    }

    warn(message: string, meta?: Meta, error?: ErrorExtended) {
        this.log('warn', message, meta, error);
    }

    error(message: string, meta?: Meta, error?: ErrorExtended) {
        this.log('error', message, meta, error);
    }

    request(httpRequest: HTTPRequest) {
        if (env.NODE_ENV === 'production') console.log(JSON.stringify(httpRequest));
    }
}
