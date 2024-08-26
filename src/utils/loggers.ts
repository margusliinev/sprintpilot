import { HTTPException } from 'hono/http-exception';

export class HttpLogger {
    logByStatus(status: number, message: string) {
        if (status >= 200 && status < 400) {
            console.info(message);
        } else if (status >= 400 && status < 500) {
            console.warn(message);
        } else {
            console.error(message);
        }
    }
}

export class ErrorLogger {
    private requestId?: string;
    private sessionId?: number;
    private userId?: number;

    constructor(requestId?: string, sessionId?: number, userId?: number) {
        this.requestId = requestId;
        this.sessionId = sessionId;
        this.userId = userId;
    }

    log(error: Error | HTTPException) {
        if (error instanceof HTTPException) {
            const status = error.status;
            const errorMessage = error.message;
            const detailsField = error.details?.field;
            const detailsMessage = error.details?.message;

            const logValues = [
                errorMessage && `Error: ${errorMessage}`,
                detailsField && `Field: ${detailsField}`,
                detailsMessage && `Message: ${detailsMessage}`,
                this.requestId && `Request ID: ${this.requestId}`,
                this.sessionId && `Session ID: ${this.sessionId}`,
                this.userId && `User ID: ${this.userId}`
            ]
                .filter(Boolean)
                .join(' | ');

            if (status >= 200 && status < 400) {
                console.info(logValues);
            } else if (status >= 400 && status < 500) {
                console.warn(logValues);
            } else {
                console.error(logValues);
            }
        } else {
            const errorMessage = error.message;
            const stack = error.stack;

            const errorLogValues = [
                errorMessage && `Unexpected Error: ${errorMessage}`,
                this.requestId && `Request ID: ${this.requestId}`,
                this.sessionId && `Session ID: ${this.sessionId}`,
                this.userId && `User ID: ${this.userId}`,
                stack && `Stack: ${stack}`
            ]
                .filter(Boolean)
                .join(' | ');

            console.error(errorLogValues);
        }
    }
}
