import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';
import { env } from './env';

export const encrypt = (value: string): string => {
    const iv = randomBytes(16);
    const key = createHash('sha256').update(env.ENCRYPTION_SECRET).digest();
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(value, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${iv.toString('base64')}:${encrypted}`;
};

export const decrypt = (value: string) => {
    const [ivBase64, encrypted] = value.split(':');
    const iv = Buffer.from(String(ivBase64), 'base64');
    const key = createHash('sha256').update(env.ENCRYPTION_SECRET).digest();
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(String(encrypted), 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
