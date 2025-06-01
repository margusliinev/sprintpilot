import type { SessionValidationResult } from '../features/auth/auth.service';
import { Logger } from '../helpers/logger';
import { models } from '../models';

declare module 'hono' {
    interface ContextVariableMap {
        log: Logger;
        session: Exclude<SessionValidationResult['session'], null>;
        user: Exclude<SessionValidationResult['user'], null>;
        models: typeof models;
    }
}
