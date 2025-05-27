import type { Session, User } from '../db/schema';
import type { Context } from 'hono';
import { createNewSession, deleteSession, updateSession } from '../queries/sessions';
import { setSignedCookie, deleteCookie, getSignedCookie } from 'hono/cookie';
import { getUserWithSession, deleteUserSessions } from '../queries/users';
import { env } from './env';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const sessionCookieName = 'auth-session';

export async function createSession(user_id: string) {
    const newSession = await createNewSession({
        user_id,
        expires_at: new Date(Date.now() + DAY_IN_MS * 30),
    });
    return newSession;
}

export async function validateSessionToken(sessionToken: string) {
    const [sessionWithUser] = await getUserWithSession(sessionToken);

    if (!sessionWithUser) {
        return { user: null, session: null };
    }

    const { user, session } = sessionWithUser;

    const sessionExpired = Date.now() >= session.expires_at.getTime();
    if (sessionExpired) {
        await deleteSession(session.id);
        return { user: null, session: null };
    }

    const renewSession = Date.now() >= session.expires_at.getTime() - DAY_IN_MS * 15;
    if (renewSession) {
        session.expires_at = new Date(Date.now() + DAY_IN_MS * 30);
        await updateSession(session.id, { expires_at: session.expires_at });
    }

    return { user, session };
}

export async function invalidateSession(sessionId: Session['id']) {
    await deleteSession(sessionId);
}

export async function invalidateUserSessions(userId: User['id']) {
    await deleteUserSessions(userId);
}

export async function getSessionTokenCookie(ctx: Context) {
    return await getSignedCookie(ctx, env.SESSION_SECRET, sessionCookieName);
}

export async function setSessionTokenCookie(ctx: Context, token: string, expires_at: Date) {
    await setSignedCookie(ctx, sessionCookieName, token, env.SESSION_SECRET, {
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        expires: expires_at,
    });
}

export function deleteSessionTokenCookie(ctx: Context) {
    deleteCookie(ctx, sessionCookieName, {
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    });
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;
