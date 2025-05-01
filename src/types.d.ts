import { ValidSessionValidationResult } from './helpers/auth';
import { Logger } from './helpers/logger';

declare module 'hono' {
    interface ContextVariableMap {
        user: ValidSessionValidationResult['user'];
        session: ValidSessionValidationResult['session'];
    }
    interface Context {
        logger: Logger;
    }
}
