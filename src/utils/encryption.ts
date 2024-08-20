import { randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';
import { InternalServerErrorException } from './errors';
import { env } from './env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;
const ITERATIONS = 10000;

const deriveKey = (secret: string, salt: Buffer): Buffer => {
    return pbkdf2Sync(secret, salt, ITERATIONS, KEY_LENGTH, 'sha256');
};

const serialize = (value: any) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return JSON.stringify(value);
};

const deserialize = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export const encrypt = (value: any) => {
    try {
        const salt = randomBytes(SALT_LENGTH);
        const iv = randomBytes(IV_LENGTH);
        const key = deriveKey(env.SESSION_SECRET, salt);
        const cipher = createCipheriv(ALGORITHM, key, iv);

        const serializedValue = serialize(value);
        const encrypted = Buffer.concat([cipher.update(serializedValue, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();

        return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted.toString('base64')}:${authTag.toString('base64')}`;
    } catch (error) {
        console.error('Failed to encrypt value:', error);
        return null;
    }
};

export const decrypt = (value: string) => {
    try {
        const parts = value.split(':');
        if (parts.length !== 4) throw new InternalServerErrorException();

        const [saltBase64, ivBase64, encryptedBase64, authTagBase64] = parts;
        if (!saltBase64 || !ivBase64 || !encryptedBase64 || !authTagBase64) throw new InternalServerErrorException();

        const salt = Buffer.from(saltBase64, 'base64');
        const iv = Buffer.from(ivBase64, 'base64');
        const encrypted = Buffer.from(encryptedBase64, 'base64');
        const authTag = Buffer.from(authTagBase64, 'base64');

        const key = deriveKey(env.SESSION_SECRET, salt);
        const decipher = createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        const decryptedString = decrypted.toString('utf8');
        return deserialize(decryptedString);
    } catch (error) {
        console.error('Failed to decrypt value:', error);
        return null;
    }
};
