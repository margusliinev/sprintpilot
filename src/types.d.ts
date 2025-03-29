import { Logger } from './middleware/logger';

declare module 'hono' {
    interface Context {
        logger: Logger;
    }
}
