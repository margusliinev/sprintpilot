import { before, after, describe, test } from 'node:test';
import { strictEqual } from 'node:assert';
import { app } from '../../src/index';

describe('Health Routes', async () => {
    before(() => {
        console.log('Tests started');
    });

    after(() => {
        console.log('Tests finished');
        process.exit(0);
    });

    test('GET /api/health/ok', async () => {
        const response = await app.request('/api/health/ok');

        strictEqual(response.status, 200);
    });
});
