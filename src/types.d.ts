import { ValidSessionValidationResult } from './helpers/auth';
import { Logger } from './middleware/logger';

declare module 'hono' {
    interface ContextVariableMap {
        user: ValidSessionValidationResult['user'];
        session: ValidSessionValidationResult['session'];
    }
    interface Context {
        logger: Logger;
    }
}
