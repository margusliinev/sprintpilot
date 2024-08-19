import { HTTPException } from 'hono/http-exception';

interface ErrorDetails {
    field: string;
    message: string;
}

declare module 'hono/http-exception' {
    interface HTTPException {
        details?: ErrorDetails;
    }
}
