import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    migrations: { table: 'migrations' },
    verbose: true,
    strict: true,
});
