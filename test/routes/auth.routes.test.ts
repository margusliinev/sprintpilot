import { usersTable, sessionsTable } from '../../src/db/schema';
import { describe, test, expect, beforeEach, beforeAll } from 'bun:test';
import { db, runMigrations } from '../../src/db';
import { app } from '../../src/server';

describe('Auth Routes', () => {
    beforeAll(async () => {
        await runMigrations();
    });

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should successfully register a new user', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data.success).toBe(true);
    });
});
