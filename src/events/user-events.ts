import type { AvailableEvents } from '.';
import { defineHandlers } from '@hono/event-emitter';

export const userEventHandlers = defineHandlers<AvailableEvents>({
    'user:created': [
        (ctx, user) => {
            ctx.var.log.info('User Created', user);
        },
    ],
});
