import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    migrations: { table: 'migrations' },
    dbCredentials: { url: process.env.DATABASE_URL },
    verbose: true,
    strict: true,
});
