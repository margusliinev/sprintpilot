import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, beforeEach } from 'vitest';
import { createNewUser } from '../../src/queries/users.ts';
import { hashPassword } from '../../src/helpers/index.ts';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';
import { db } from '../../src/db/index.ts';

describe('GET /users/me', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should throw 401 if user is not logged in', async () => {
        const res = await client.api.users.me.$get();
        const data = (await res.json()) as any;

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Unauthorized');
    });

    test('should successfully return current user data', async () => {
        const password = 'johndoe123';
        const hashedPassword = await hashPassword(password);
        const createdUser = await createNewUser({ name: 'John Doe', email: 'johndoe@example.com', password: hashedPassword });

        const loginRes = await client.api.auth.login.$post({
            json: {
                email: createdUser.email,
                password: password,
            },
        });
        const userRes = await client.api.users.me.$get(
            {},
            {
                headers: {
                    cookie: loginRes.headers.get('set-cookie') || '',
                },
            },
        );
        const data = (await userRes.json()) as any;

        expect(userRes.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe(createdUser.id);
        expect(data.data.name).toBe(createdUser.name);
        expect(data.data.email).toBe(createdUser.email);
        expect(data.data.password).toBeUndefined();
        expect(new Date(data.data.created_at)).toStrictEqual(createdUser.created_at);
        expect(new Date(data.data.updated_at)).toStrictEqual(createdUser.updated_at);
    });
});
