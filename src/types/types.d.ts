import type { SessionValidationResult } from '../helpers/auth';
import { logger } from '../helpers/logger';

declare module 'hono' {
    interface ContextVariableMap {
        log: ReturnType<typeof logger.child>;
        user: Exclude<SessionValidationResult['user'], null>;
        session: Exclude<SessionValidationResult['session'], null>;
    }
}
