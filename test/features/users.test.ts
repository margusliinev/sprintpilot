import { describe, test, expect } from 'bun:test';
import { setupAuthUser } from '../helpers';
import { models } from '../../src/models';
import { app } from '../../src/server';

describe('Users', () => {
    test('should get authenticated user info', async () => {
        const { cookie, user } = await setupAuthUser();

        const res = await app.request('/api/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
        });

        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data.id).toBe(user.id);
        expect(data.data.email).toBe(user.email);
        expect(data.data.name).toBe(user.name);
    });

    test('should allow users to revoke all sessions', async () => {
        const { cookie } = await setupAuthUser();

        const sessions = await models.session.getAllSessions();
        expect(sessions.length).toBe(1);

        const res = await app.request('/api/users/me/sessions', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
        });

        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Sessions revoked successfully');

        const updatedSessions = await models.session.getAllSessions();
        expect(updatedSessions.length).toBe(0);
    });

    test('should fail to get authenticated user info if not authenticated', async () => {
        const res = await app.request('/api/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
    });

    test('should fail to revoke sessions if not authenticated', async () => {
        const res = await app.request('/api/users/me/sessions', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
    });
});
