import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        env: {
            PORT: '3000',
            NODE_ENV: 'test',
            DATABASE_URL: 'mysql://user:password@localhost:3307/db_test',
            SESSION_SECRET: 'random-hex-string-min-32-characters',
        },
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
        coverage: {
            exclude: ['node_modules', 'build', 'test', 'drizzle.config.ts', 'vitest.config.ts'],
        },
    },
});
