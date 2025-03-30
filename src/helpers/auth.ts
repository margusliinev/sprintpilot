import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { usersTable, sessionsTable, NewSession } from '../db/schema';
import { setSignedCookie, deleteCookie } from 'hono/cookie';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import { env } from './env';
import { db } from '../db';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    const token = encodeBase64url(bytes);
    return token;
}

export async function createSession(token: string, user_id: number) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: NewSession = {
        id: sessionId,
        user_id,
        expires_at: new Date(Date.now() + DAY_IN_MS * 30),
    };
    await db.insert(sessionsTable).values(session);
    return session;
}

export async function validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const [result] = await db
        .select({
            user: { id: usersTable.id, name: usersTable.name, email: usersTable.email },
            session: sessionsTable,
        })
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
        .where(eq(sessionsTable.id, sessionId));

    if (!result) {
        return { session: null, user: null };
    }
    const { user, session } = result;

    const sessionExpired = Date.now() >= session.expires_at.getTime();
    if (sessionExpired) {
        await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
        return { session: null, user: null };
    }

    const renewSession = Date.now() >= session.expires_at.getTime() - DAY_IN_MS * 15;
    if (renewSession) {
        session.expires_at = new Date(Date.now() + DAY_IN_MS * 30);
        await db.update(sessionsTable).set({ expires_at: session.expires_at }).where(eq(sessionsTable.id, session.id));
    }

    return { user, session };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(session_id: string) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session_id));
}

export function setSessionTokenCookie(ctx: Context, token: string, expires_at: Date) {
    setSignedCookie(ctx, sessionCookieName, token, env.SESSION_SECRET, {
        expires: expires_at,
        path: '/',
    });
}

export function deleteSessionTokenCookie(ctx: Context) {
    deleteCookie(ctx, sessionCookieName, {
        path: '/',
    });
}
