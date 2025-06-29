import { createMiddleware } from 'hono/factory';
import { models } from '../models';

const bootstrapMiddleware = createMiddleware(async (ctx, next) => {
    ctx.set('models', models);

    await next();
});

export default bootstrapMiddleware;
