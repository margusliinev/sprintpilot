import type { Session, User } from '../../db/schema';
import type { Context } from 'hono';
import { setSignedCookie, deleteCookie, getSignedCookie } from 'hono/cookie';
import { env } from '../../helpers/env';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const sessionCookieName = 'auth-session';

async function createSession(ctx: Context, user_id: string) {
    const newSession = await ctx.var.models.session.createNewSession({
        user_id,
        expires_at: new Date(Date.now() + DAY_IN_MS * 30).toISOString(),
    });
    return newSession;
}

async function validateSessionToken(ctx: Context, sessionToken: string) {
    const [sessionWithUser] = await ctx.var.models.user.getUserWithSession(sessionToken);

    if (!sessionWithUser) {
        return { session: null, user: null };
    }

    const { session, user } = sessionWithUser;

    const sessionExpired = Date.now() >= new Date(session.expires_at).getTime();
    if (sessionExpired) {
        await ctx.var.models.session.deleteSession(session.id);
        return { session: null, user: null };
    }

    const renewSession = Date.now() >= new Date(session.expires_at).getTime() - DAY_IN_MS * 15;
    if (renewSession) {
        session.expires_at = new Date(Date.now() + DAY_IN_MS * 30).toISOString();
        await ctx.var.models.session.updateSession(session.id, { expires_at: session.expires_at });
    }

    return { session, user };
}

async function invalidateSession(ctx: Context, sessionId: Session['id']) {
    await ctx.var.models.session.deleteSession(sessionId);
}

async function invalidateUserSessions(ctx: Context, userId: User['id']) {
    await ctx.var.models.user.deleteUserSessions(userId);
}

async function getSessionTokenCookie(ctx: Context) {
    return await getSignedCookie(ctx, env.SESSION_SECRET, sessionCookieName);
}

async function setSessionTokenCookie(ctx: Context, token: string, expires_at: string) {
    await setSignedCookie(ctx, sessionCookieName, token, env.SESSION_SECRET, {
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        expires: new Date(expires_at),
    });
}

function deleteSessionTokenCookie(ctx: Context) {
    deleteCookie(ctx, sessionCookieName, {
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    });
}

export const authService = {
    createSession,
    validateSessionToken,
    invalidateSession,
    invalidateUserSessions,
    getSessionTokenCookie,
    setSessionTokenCookie,
    deleteSessionTokenCookie,
};

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;
