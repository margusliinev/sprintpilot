import { getSignedCookie, setSignedCookie, deleteCookie as deleteCookieHono } from 'hono/cookie';
import { decrypt, encrypt } from './encryption';
import { CookieOptions } from 'hono/utils/cookie';
import { Context } from 'hono';
import { env } from './env';

const defaultCookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax'
};

export const getCookie = async (c: Context, name: string) => {
    const value = await getSignedCookie(c, env.COOKIE_SECRET, name);
    if (!value) return null;
    return decrypt(value);
};

export const setCookie = (c: Context, name: string, value: any) => {
    const encryptedValue = encrypt(value);
    return setSignedCookie(c, name, encryptedValue, env.COOKIE_SECRET, defaultCookieOptions);
};

export const deleteCookie = (c: Context, name: string) => {
    return deleteCookieHono(c, name);
};
