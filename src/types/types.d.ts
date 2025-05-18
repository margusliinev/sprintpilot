import type { SessionValidationResult } from '../helpers/index.ts';
import { logger } from '../helpers/index.ts';

declare module 'hono' {
    interface ContextVariableMap {
        log: ReturnType<typeof logger.child>;
        user: SessionValidationResult['user'];
        session: SessionValidationResult['session'];
    }
}
