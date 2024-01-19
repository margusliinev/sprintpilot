import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

export default {
    schema: './app/db/schema.ts',
    driver: 'mysql2',
    out: './app/db/migrations',
    dbCredentials: { uri: process.env.DATABASE_URL },
} satisfies Config;
