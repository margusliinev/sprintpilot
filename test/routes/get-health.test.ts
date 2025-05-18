import { describe, test, expect } from 'vitest';
import { testClient } from 'hono/testing';
import { app } from '../../src/server.ts';

describe('GET /health', () => {
    const client = testClient(app);

    test('should return successful response for healthcheck', async () => {
        const res = await client.api.health.$get();
        const data = await res.json();

        expect(data.success).toBe(true);
        expect(data.message).toBe('OK');
        expect(res.status).toBe(200);
    });
});
