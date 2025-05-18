import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, beforeEach } from 'vitest';
import { createNewUser } from '../../src/queries/users.ts';
import { hashPassword } from '../../src/helpers/index.ts';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';
import { db } from '../../src/db/index.ts';

describe('DELETE /users/me/sessions', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(sessionsTable);
        await db.delete(usersTable);
    });

    test('should throw 401 if user is not logged in', async () => {
        const res = await client.api.users.me.sessions.$delete();
        const data = (await res.json()) as any;

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Unauthorized');
    });

    test('should successfully delete all current user sessions', async () => {
        const password = 'johndoe123';
        const hashedPassword = await hashPassword(password);
        const createdUser = await createNewUser({ name: 'John Doe', email: 'johndoe@example.com', password: hashedPassword });

        const loginRes = await client.api.auth.login.$post({
            json: {
                email: createdUser.email,
                password: password,
            },
        });

        const sessions = await db.select().from(sessionsTable);
        expect(sessions.length).toBe(1);

        const userRes = await client.api.users.me.sessions.$delete(
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
        expect(data.message).toBe('Sessions revoked successfully');

        const sessionsAfterDelete = await db.select().from(sessionsTable);
        expect(sessionsAfterDelete.length).toBe(0);
    });
});
