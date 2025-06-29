import type { User, Session } from '../db/schema';
import { defineHandlers } from '@hono/event-emitter';
import { userEventHandlers } from './user-events';
import { sessionEventHandlers } from './session-events';

export type AvailableEvents = {
    'user:created': Omit<User, 'password'>;
    'session:created': Session;
};

export const handlers = defineHandlers<AvailableEvents>({
    ...userEventHandlers,
    ...sessionEventHandlers,
});
