import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, beforeEach } from 'vitest';
import { testClient } from 'hono/testing';
import { db } from '../../src/db/index.ts';
import { app } from '../../src/server.ts';
import { eq } from 'drizzle-orm';

describe('POST /auth/register', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should fail validation if name is missing', async () => {
        const res = await client.api.auth.register.$post({
            // @ts-ignore
            json: {
                email: 'johndoe@example.com',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ name: 'Name is required' });
    });

    test('should fail validation if name is too short', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'J',
                email: 'johndoe@example.com',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ name: 'Name must be at least 2 characters' });
    });

    test('should fail validation if name is too long', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe'.repeat(10),
                email: 'johndoe@example.com',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ name: 'Name must be at most 50 characters' });
    });

    test('should fail validation if email is missing', async () => {
        const res = await client.api.auth.register.$post({
            // @ts-ignore
            json: {
                name: 'John Doe',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Email is required' });
    });

    test('should fail validation if email is invalid', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
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
        const res = await client.api.auth.register.$post({
            // @ts-ignore
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password is required' });
    });

    test('should fail validation if password is too short', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'short',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password must be at least 8 characters' });
    });

    test('should fail validation if password is too long', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123'.repeat(30),
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password must be at most 255 characters' });
    });

    test('should fail validation if password does not contain a number', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password must contain at least one number' });
    });

    test('should fail validation if password does not contain a letter', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456789',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ password: 'Password must contain at least one letter' });
    });

    test('should fail if email already exists', async () => {
        await db.insert(usersTable).values({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '#04jasak19138asdaj12380',
        });

        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe New',
                email: 'johndoe@example.com',
                password: '#82931831129sjidf2913',
            },
        });
        const data = (await res.json()) as any;

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({ email: 'Email already exists' });
    });

    test('should successfully register a new user', async () => {
        const res = await client.api.auth.register.$post({
            json: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'johndoe123',
            },
        });
        const data = (await res.json()) as any;
        const user = await db.select().from(usersTable).where(eq(usersTable.email, 'johndoe@example.com'));

        expect(res.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Register successful');
        expect(user[0].name).toBe('John Doe');
        expect(user[0].email).toBe('johndoe@example.com');
        expect(user[0].password).not.toBe('johndoe123');
        expect(res.headers.get('set-cookie')).toBeTruthy();
        expect(res.headers.get('set-cookie')).toMatch(/auth-session=/);
    });
});
