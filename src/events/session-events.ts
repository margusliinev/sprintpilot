import type { AvailableEvents } from '.';
import { defineHandlers } from '@hono/event-emitter';

export const sessionEventHandlers = defineHandlers<AvailableEvents>({
    'session:created': [
        (ctx, session) => {
            ctx.var.log.info('Session Created', session);
        },
    ],
});
