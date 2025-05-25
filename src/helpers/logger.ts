import { env } from './env';
import winston from 'winston';

const { combine, timestamp, prettyPrint, json } = winston.format;

const devFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), prettyPrint({ colorize: true }));
const liveFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json());

export const logger = winston.createLogger({
    format: env.NODE_ENV === 'development' ? devFormat : liveFormat,
    transports: [new winston.transports.Console()],
});
