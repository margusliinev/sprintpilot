import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, beforeEach } from 'vitest';
import { hashPassword } from '../../src/helpers/index.ts';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';
import { db } from '../../src/db/index.ts';

describe('POST /auth/logout', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should throw 401 if user is not logged in', async () => {
        const res = await client.api.auth.logout.$post();
        const data = (await res.json()) as any;

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Unauthorized');
    });

    test('should successfully log out the user', async () => {
        const password = 'johndoe123';
        const hashedPassword = await hashPassword(password);

        await db.insert(usersTable).values({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: hashedPassword,
        });

        const loginRes = await client.api.auth.login.$post({
            json: {
                email: 'johndoe@example.com',
                password: password,
            },
        });

        const sessions = await db.select().from(sessionsTable);
        expect(sessions.length).toBe(1);
        expect(loginRes.headers.get('set-cookie')).toBeTruthy();
        expect(loginRes.headers.get('set-cookie')).toMatch(/auth-session=/);
        expect(loginRes.headers.get('set-cookie')).not.toMatch(/Max-Age=0/);

        const logoutRes = await client.api.auth.logout.$post(
            {},
            {
                headers: {
                    cookie: loginRes.headers.get('set-cookie') || '',
                },
            },
        );
        const data = (await logoutRes.json()) as any;

        expect(logoutRes.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Logout successful');

        const updatedSessions = await db.select().from(sessionsTable);

        expect(updatedSessions.length).toBe(0);
        expect(logoutRes.headers.get('set-cookie')).toBeTruthy();
        expect(logoutRes.headers.get('set-cookie')).toMatch(/auth-session=/);
        expect(logoutRes.headers.get('set-cookie')).toMatch(/Max-Age=0/);
    });
});
