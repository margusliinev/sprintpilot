import { describe, test, expect } from 'vitest';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';

describe('/Health', () => {
    const client = testClient(app);

    test('should return successful response for healthcheck', async () => {
        const res = await client.api.health.$get();
        const { success, message } = await res.json();

        expect(success).toBe(true);
        expect(message).toBe('OK');
        expect(res.status).toBe(200);
    });
});
