import { describe, test, expect } from 'bun:test';
import { app } from '../../src/server';

describe('Health Routes', () => {
    test('should return successful response for healthcheck', async () => {
        const res = await app.request('/api/health/ok');
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual({
            success: true,
            message: 'OK',
        });
    });
});
