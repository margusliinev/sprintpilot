import { randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync, scrypt } from 'crypto';
import { promisify } from 'util';
import { env } from './env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;
const ITERATIONS = 10000;

const deriveEncryptionKey = (secret: string, salt: Buffer): Buffer => {
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

const scryptAsync = promisify(scrypt);

export const encrypt = (value: any) => {
    try {
        const salt = randomBytes(SALT_LENGTH);
        const iv = randomBytes(IV_LENGTH);
        const key = deriveEncryptionKey(env.SESSION_SECRET, salt);
        const cipher = createCipheriv(ALGORITHM, key, iv);

        const serializedValue = serialize(value);
        const encrypted = Buffer.concat([cipher.update(serializedValue, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();

        return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted.toString('base64')}:${authTag.toString('base64')}`;
    } catch (error) {
        console.error('Encryption error occurred');
        return null;
    }
};

export const decrypt = (value: string) => {
    try {
        const parts = value.split(':');
        if (parts.length !== 4) throw new Error('Invalid encrypted value');

        const [saltBase64, ivBase64, encryptedBase64, authTagBase64] = parts;
        if (!saltBase64 || !ivBase64 || !encryptedBase64 || !authTagBase64) throw new Error('Invalid encrypted value');

        const salt = Buffer.from(saltBase64, 'base64');
        const iv = Buffer.from(ivBase64, 'base64');
        const encrypted = Buffer.from(encryptedBase64, 'base64');
        const authTag = Buffer.from(authTagBase64, 'base64');

        const key = deriveEncryptionKey(env.SESSION_SECRET, salt);
        const decipher = createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        const decryptedString = decrypted.toString('utf8');
        return deserialize(decryptedString);
    } catch (error) {
        console.error('Decryption error occurred');
        return null;
    }
};

export const hashPassword = async (password: string): Promise<string | null> => {
    try {
        const salt = randomBytes(16).toString('hex');
        const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${salt}:${derivedKey.toString('hex')}`;
    } catch (err) {
        console.error('Failed Hashing Password');
        return null;
    }
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        const [salt, key] = hash.split(':');
        if (!salt || !key) return false;
        const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
        return key === derivedKey.toString('hex');
    } catch (err) {
        console.error('Failed Verifying Password');
        return false;
    }
};
