import { createMiddleware } from 'hono/factory';
import { Logger } from '../utils';

export const logger = () =>
    createMiddleware(async (c, next) => {
        const requestId = c.get('requestId');
        const session = c.get('session');
        const user = c.get('user');

        c.log = new Logger({ requestId, sessionId: session?.id, userId: user?.id });
        await next();
    });
