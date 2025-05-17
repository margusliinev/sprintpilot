import type { SessionValidationResult } from '../helpers/index.ts';
import { logger } from '../helpers/index.ts';

declare module 'hono' {
    interface ContextVariableMap {
        user: Exclude<SessionValidationResult['user'], null>;
        session: Exclude<SessionValidationResult['session'], null>;
    }
    interface Context {
        log: ReturnType<typeof logger.child>;
    }
}
