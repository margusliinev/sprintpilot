import { createFactory } from 'hono/factory';

const factory = createFactory();

export const healthHandler = factory.createHandlers(async (c) => {
    return c.json({ success: true, message: 'OK' });
});
