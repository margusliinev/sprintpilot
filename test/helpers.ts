import type { User, NewUser } from '../src/db/schema';
import { models } from '../src/models';
import { app } from '../src/server';

export async function setupAuthUser(userData: Partial<NewUser> = {}) {
    const defaultUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
    };

    const registerResponse = await app.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(defaultUser),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const cookie = registerResponse.headers.get('set-cookie');
    const [user] = await models.user.getUserByEmail(defaultUser.email);

    if (!cookie || !user) throw new Error('Failed to setup authenticated user');

    return { cookie, user };
}
