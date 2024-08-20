import { before, after, describe, test } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { server, app } from '../../index';

describe('Health Routes', async () => {
    before(() => {
        server.listen();
        console.log('Tests started');
    });

    after(() => {
        server.close();
        console.log('Tests finished');
    });

    test('GET /api/health/ok', async () => {
        const response = await app.request('/api/health/ok');
        const data = await response.json();

        deepStrictEqual(response.status, 200);
        deepStrictEqual(data, { success: true, message: 'OK' });
        deepStrictEqual(response.headers.get('content-type'), 'application/json; charset=UTF-8');
    });
});
