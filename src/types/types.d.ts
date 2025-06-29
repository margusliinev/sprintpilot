import type { SessionValidationResult } from '../features/auth/auth.service';
import type { Emitter } from '@hono/event-emitter';
import type { AvailableEvents } from '../events';
import { Logger } from '../helpers/logger';
import { models } from '../models';

declare module 'hono' {
    interface ContextVariableMap {
        models: typeof models;
        session: Exclude<SessionValidationResult['session'], null>;
        user: Exclude<SessionValidationResult['user'], null>;
        emitter: Emitter<AvailableEvents>;
        log: Logger;
    }
}
