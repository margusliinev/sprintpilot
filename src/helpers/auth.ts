import type { Session, User } from '../db/schema.ts';
import type { Context } from 'hono';
import { createNewSession, deleteSession, updateSession } from '../queries/sessions.ts';
import { getUserWithSession, deleteUserSessions } from '../queries/users.ts';
import { setSignedCookie, deleteCookie, getSignedCookie } from 'hono/cookie';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { env } from './env.ts';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    const token = encodeBase64url(bytes);
    return token;
}

export async function createSession(token: string, user_id: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const newSession = await createNewSession({
        id: sessionId,
        user_id,
        expires_at: new Date(Date.now() + DAY_IN_MS * 30),
    });
    return newSession;
}

export async function validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const sessionWithUser = await getUserWithSession(sessionId);

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
