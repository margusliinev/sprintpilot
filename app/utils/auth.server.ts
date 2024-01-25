import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getUserBySessionId } from '@/models/session.server';
import { Session } from '@/db/schema';
import bcrypt from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

if (!SESSION_SECRET) throw new Error('SESSION_SECRET is not set');

export const authSessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function requireUserId(request: Request) {
    const cookie = request.headers.get('cookie');
    const session = await authSessionStorage.getSession(cookie);
    const sessionId = session.get('sessionId');

    const user = await getUserBySessionId(sessionId);
    if (!user) throw redirect('/login', { headers: { 'set-cookie': await authSessionStorage.destroySession(session) } });

    return user.id;
}

export async function setCookieSessionAndRedirect(request: Request, session: Session, redirectTo: string) {
    const cookie = request.headers.get('cookie');
    const authSession = await authSessionStorage.getSession(cookie);
    authSession.set('sessionId', session.id);

    return redirect(redirectTo, {
        headers: {
            'set-cookie': await authSessionStorage.commitSession(authSession, {
                expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
            }),
        },
    });
}

export function hashPassword(password: string) {
    try {
        const hashedPassword = bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function verifyPassword(password: string, hashedPassword: string) {
    try {
        const isMatch = bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error(error);
        return false;
    }
}
