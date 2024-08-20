import { randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';
import { InternalServerErrorException } from './errors';
import { env } from './env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const ITERATIONS = 10000;
const SALT = env.ENCRYPTION_SALT;

const getKey = (password: string) => {
    return pbkdf2Sync(password, SALT, ITERATIONS, KEY_LENGTH, 'sha256');
};
const key = getKey(env.ENCRYPTION_SECRET);

export const encrypt = (value: string): string => {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString('base64')}:${encrypted.toString('base64')}:${authTag.toString('base64')}`;
};

export const decrypt = (value: string): string => {
    const parts = value.split(':');
    const [ivBase64, encryptedBase64, authTagBase64] = parts;
    if (!ivBase64 || !encryptedBase64 || !authTagBase64) throw new InternalServerErrorException();
    const iv = Buffer.from(ivBase64, 'base64');
    const encrypted = Buffer.from(encryptedBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
};
