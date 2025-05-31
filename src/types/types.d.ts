import type { SessionValidationResult } from '../helpers/auth';
import { Logger } from '../helpers/logger';

declare module 'hono' {
    interface ContextVariableMap {
        log: Logger;
        user: Exclude<SessionValidationResult['user'], null>;
        session: Exclude<SessionValidationResult['session'], null>;
    }
}
