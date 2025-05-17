import { createFactory } from 'hono/factory';

const factory = createFactory();

export const getCurrentUserHandler = factory.createHandlers(async (c) => {
    const user = c.get('user');

    return c.json({ success: true, data: user });
});
