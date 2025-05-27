import { createNewUser } from '../../src/queries/users';
import { describe, test, expect } from 'bun:test';
import { app } from '../../src/server';

describe('Auth Routes', () => {
    test('should successfully register a new user', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Register successful');
    });

    test('should fail to register if name is missing', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            name: 'Name is invalid',
        });
    });

    test('should fail to register if email is missing', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            email: 'Email is invalid',
        });
    });

    test('should fail to register if password is missing', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            password: 'Password is invalid',
        });
    });

    test('should fail to register if email is already in use', async () => {
        const password = await Bun.password.hash('password123', { algorithm: 'bcrypt' });

        await createNewUser({
            name: 'Test User',
            email: 'test@example.com',
            password,
        });

        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            email: 'Email already exists',
        });
    });

    test('should successfully login the user', async () => {
        const password = await Bun.password.hash('password123', { algorithm: 'bcrypt' });
        await createNewUser({
            name: 'Test User',
            email: 'test@example.com',
            password,
        });

        const res = await app.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Login successful');
    });

    test('should fail if login email is missing', async () => {
        const res = await app.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            email: 'Email is invalid',
        });
    });

    test('should fail if login password is missing', async () => {
        const res = await app.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Bad Request');
        expect(data.errors).toStrictEqual({
            password: 'Password is invalid',
        });
    });

    test('should fail to login with invalid email', async () => {
        const password = await Bun.password.hash('password123', { algorithm: 'bcrypt' });
        await createNewUser({
            name: 'Test User',
            email: 'test@example.com',
            password,
        });

        const res = await app.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'random@example.com',
                password: 'password123',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Unauthorized');
        expect(data.errors).toStrictEqual({
            email: 'Invalid email or password',
        });
    });

    test('should fail to login with invalid password', async () => {
        const password = await Bun.password.hash('password123', { algorithm: 'bcrypt' });
        await createNewUser({
            name: 'Test User',
            email: 'test@example.com',
            password,
        });

        const res = await app.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password456',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.success).toBe(false);
        expect(data.message).toBe('Unauthorized');
        expect(data.errors).toStrictEqual({
            email: 'Invalid email or password',
        });
    });
});
