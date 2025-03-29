import { RequestLog } from '../middleware/logger';
import { env } from '../helpers/env';

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
