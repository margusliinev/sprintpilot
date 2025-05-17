import type { SessionValidationResult } from './auth.ts';
import { validateBody, validateParams, validateQuery } from './validation.ts';
import { logger } from './logger.ts';
import { env } from './env.ts';
import {
    createSession,
    validateSessionToken,
    generateSessionToken,
    setSessionTokenCookie,
    invalidateSession,
    invalidateUserSessions,
    getSessionTokenCookie,
    deleteSessionTokenCookie,
} from './auth.ts';
import {
    BadRequestException,
    UnauthorizedException,
    PaymentRequiredException,
    ForbiddenException,
    NotFoundException,
    MethodNotAllowedException,
    ConflictException,
    UnprocessableEntityException,
    TooManyRequestsException,
    InternalServerErrorException,
    handleNotFound,
    handleError,
} from './errors.ts';
import { hashPassword, verifyPassword, verifyPasswordStrength } from './password.ts';

export type { SessionValidationResult };
export {
    validateBody,
    validateParams,
    validateQuery,
    logger,
    env,
    createSession,
    validateSessionToken,
    generateSessionToken,
    setSessionTokenCookie,
    invalidateSession,
    invalidateUserSessions,
    getSessionTokenCookie,
    deleteSessionTokenCookie,
    BadRequestException,
    UnauthorizedException,
    PaymentRequiredException,
    ForbiddenException,
    NotFoundException,
    MethodNotAllowedException,
    ConflictException,
    UnprocessableEntityException,
    TooManyRequestsException,
    InternalServerErrorException,
    handleNotFound,
    handleError,
    hashPassword,
    verifyPassword,
    verifyPasswordStrength,
};
