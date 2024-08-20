import { getSignedCookie, setSignedCookie, deleteCookie as deleteCookieHono } from 'hono/cookie';
import { CookieOptions } from 'hono/utils/cookie';
import { Context } from 'hono';
import { env } from '../config';

const defaultCookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax'
};

export const getCookie = (c: Context, name: string) => {
    return getSignedCookie(c, env.SESSION_SECRET, name);
};

export const setCookie = (c: Context, name: string, value: string | number) => {
    return setSignedCookie(c, name, String(value), env.SESSION_SECRET, defaultCookieOptions);
};

export const deleteCookie = (c: Context, name: string) => {
    return deleteCookieHono(c, name);
};
