import { ValidSessionValidationResult } from './helpers/auth';
import { logger } from './helpers/logger';

declare module 'hono' {
    interface ContextVariableMap {
        user: ValidSessionValidationResult['user'];
        session: ValidSessionValidationResult['session'];
    }
    interface Context {
        log: ReturnType<typeof logger.child>;
    }
}
