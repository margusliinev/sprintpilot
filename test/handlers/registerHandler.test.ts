import { sessionsTable, usersTable } from '../../src/db/schema.ts';
import { describe, test, expect, afterAll } from 'vitest';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';
import { db } from '../../src/db/index.ts';
import { beforeEach } from 'node:test';

describe('/Register', () => {
    const client = testClient(app);

    beforeEach(async () => {
        await db.delete(usersTable);
        await db.delete(sessionsTable);
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

        expect(data.success).toBe(false);
        expect(data.errors).toStrictEqual({
            name: 'Name is required',
        });
        expect(res.status).toBe(400);
    });
});
