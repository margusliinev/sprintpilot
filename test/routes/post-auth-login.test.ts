import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, beforeEach } from 'vitest';
import { hashPassword } from '../../src/helpers/index.ts';
import { testClient } from 'hono/testing';
import { db } from '../../src/db/index.ts';
import { app } from '../../src/server.ts';
import { eq } from 'drizzle-orm';

describe('POST /auth/login', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should fail validation if email is missing', async () => {
        const res = await client.api.auth.login.$post({
            // @ts-ignore
            json: {
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Email is required' });
    });

    test('should fail validation if email is invalid', async () => {
        const res = await client.api.auth.login.$post({
            json: {
                email: 'invalid-email',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Email is invalid' });
    });

    test('should fail validation if password is missing', async () => {
        const res = await client.api.auth.login.$post({
            // @ts-ignore
            json: {
                email: 'johndoe@example.com',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password is required' });
    });

    test('should fail if user is not found by email', async () => {
        const res = await client.api.auth.login.$post({
            json: {
                email: 'johndoe@example.com',
                password: '#82931831129sjidf2913',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Invalid email or password' });
    });

    test('should fail if password does not match', async () => {
        const password = 'johndoe123';
        const hashedPassword = await hashPassword(password);

        await db.insert(usersTable).values({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: hashedPassword,
        });

        const res = await client.api.auth.login.$post({
            json: {
                email: 'johndoe@example.com',
                password: 'johndoe456',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Invalid email or password' });
    });

    test('should successfully login the user', async () => {
        const password = 'johndoe123';
        const hashedPassword = await hashPassword(password);

        await db.insert(usersTable).values({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: hashedPassword,
        });

        const res = await client.api.auth.login.$post({
            json: {
                email: 'johndoe@example.com',
                password: password,
            },
        });
        const data = (await res.json()) as any;
        const user = await db.select().from(usersTable).where(eq(usersTable.email, 'johndoe@example.com'));
        const sessions = await db.select().from(sessionsTable);

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Login successful');
        expect(sessions.length).toBe(1);
        expect(sessions[0].user_id).toBe(user[0].id);
        expect(res.headers.get('set-cookie')).toBeTruthy();
        expect(res.headers.get('set-cookie')).toMatch(/auth-session=/);
    });
});
