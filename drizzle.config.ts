import { defineConfig } from 'drizzle-kit';
import { env } from './src/utils';

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schemas',
    out: './src/db/migrations',
    dbCredentials: {
        url: env.DATABASE_URL
    },
    migrations: {
        schema: './src/db/schemas',
        table: 'migrations'
    },
    verbose: true,
    strict: true
});
