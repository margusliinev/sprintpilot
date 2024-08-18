import { defineConfig } from 'drizzle-kit';
import { env } from '@/config';

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dbCredentials: {
        url: env.DATABASE_URL
    },
    migrations: {
        schema: './src/db/schema.ts',
        table: 'migrations'
    }
});
