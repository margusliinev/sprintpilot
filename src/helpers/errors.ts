import { HTTPException } from 'hono/http-exception';
import { Context } from 'hono';

const HTTP_EXCEPTIONS = {
    BAD_REQUEST: { code: 400, message: 'Bad Request' },
    UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
    PAYMENT_REQUIRED: { code: 402, message: 'Payment Required' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    METHOD_NOT_ALLOWED: { code: 405, message: 'Method Not Allowed' },
    CONFLICT: { code: 409, message: 'Conflict' },
    UNPROCESSABLE_ENTITY: { code: 422, message: 'Unprocessable Entity' },
    TOO_MANY_REQUESTS: { code: 429, message: 'Too Many Requests' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
} as const;

type HttpStatusCode = (typeof HTTP_EXCEPTIONS)[keyof typeof HTTP_EXCEPTIONS]['code'];
type HttpStatusMessage = (typeof HTTP_EXCEPTIONS)[keyof typeof HTTP_EXCEPTIONS]['message'];

export class CustomException extends HTTPException {
    public errors?: Record<string, string>;

    constructor(status: HttpStatusCode, defaultMessage: HttpStatusMessage, errors?: Record<string, string>) {
        super(status, { message: defaultMessage });
        this.errors = errors;
    }
}

function createExceptionClass(statusDetail: { code: HttpStatusCode; message: HttpStatusMessage }) {
    return class extends CustomException {
        constructor(errors?: Record<string, string>) {
            super(statusDetail.code, statusDetail.message, errors);
        }
    };
}

export const BadRequestException = createExceptionClass(HTTP_EXCEPTIONS.BAD_REQUEST);
export const UnauthorizedException = createExceptionClass(HTTP_EXCEPTIONS.UNAUTHORIZED);
export const PaymentRequiredException = createExceptionClass(HTTP_EXCEPTIONS.PAYMENT_REQUIRED);
export const ForbiddenException = createExceptionClass(HTTP_EXCEPTIONS.FORBIDDEN);
export const NotFoundException = createExceptionClass(HTTP_EXCEPTIONS.NOT_FOUND);
export const MethodNotAllowedException = createExceptionClass(HTTP_EXCEPTIONS.METHOD_NOT_ALLOWED);
export const ConflictException = createExceptionClass(HTTP_EXCEPTIONS.CONFLICT);
export const UnprocessableEntityException = createExceptionClass(HTTP_EXCEPTIONS.UNPROCESSABLE_ENTITY);
export const TooManyRequestsException = createExceptionClass(HTTP_EXCEPTIONS.TOO_MANY_REQUESTS);
export const InternalServerErrorException = createExceptionClass(HTTP_EXCEPTIONS.INTERNAL_SERVER_ERROR);

export function handleNotFound(c: Context) {
    return c.json({ success: false, message: HTTP_EXCEPTIONS.NOT_FOUND.message }, HTTP_EXCEPTIONS.NOT_FOUND.code);
}

export function handleError(err: CustomException | HTTPException | Error, c: Context) {
    c.log.error(err);
    if (err instanceof CustomException) {
        return c.json({ success: false, message: err.message, errors: err.errors }, err.status);
    } else if (err instanceof HTTPException) {
        return c.json({ success: false, message: err.message }, err.status);
    } else {
        return c.json({ success: false, message: HTTP_EXCEPTIONS.INTERNAL_SERVER_ERROR.message }, HTTP_EXCEPTIONS.INTERNAL_SERVER_ERROR.code);
    }
}
