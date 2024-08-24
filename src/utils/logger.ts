export class Logger {
    private context: { requestId?: string; sessionId?: number; userId?: number } = {};

    constructor(context?: { requestId?: string; sessionId?: number; userId?: number }) {
        if (context) {
            this.context = context;
        }
    }

    private formatLog(level: string, content: string | Error) {
        const timestamp = new Date().toISOString();
        const { requestId, sessionId, userId } = this.context;
        const message = typeof content === 'string' ? content : content.message;

        return {
            timestamp,
            level,
            message,
            requestId,
            sessionId,
            userId
        };
    }

    private log(level: string, message: string | Error) {
        console.log(JSON.stringify(this.formatLog(level, message)));
    }

    info(message: string | Error) {
        this.log('INFO', message);
    }

    warn(message: string | Error) {
        this.log('WARN', message);
    }

    error(message: string | Error) {
        this.log('ERROR', message);
    }
}
