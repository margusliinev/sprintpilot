import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export type Errors = Record<string, string>;

class HTTPExceptionWithErrors extends HTTPException {
    errors?: Errors;
    constructor(status: ContentfulStatusCode, message: string, errors?: Errors) {
        super(status, { message });
        this.errors = errors;
    }
}

function createHttpException(status: ContentfulStatusCode, message: string) {
    return class extends HTTPExceptionWithErrors {
        constructor(errors?: Errors) {
            super(status, message, errors);
        }
    };
}

export const BadRequestException = createHttpException(400, 'Bad Request');
export const UnauthorizedException = createHttpException(401, 'Unauthorized');
export const PaymentRequiredException = createHttpException(402, 'Payment Required');
export const ForbiddenException = createHttpException(403, 'Forbidden');
export const NotFoundException = createHttpException(404, 'Not Found');
export const MethodNotAllowedException = createHttpException(405, 'Method Not Allowed');
export const ConflictException = createHttpException(409, 'Conflict');
export const UnprocessableEntityException = createHttpException(422, 'Unprocessable Entity');
export const TooManyRequestsException = createHttpException(429, 'Too Many Requests');
export const InternalServerErrorException = createHttpException(500, 'Internal Server Error');

export function handleNotFound(c: Context) {
    return c.json({ success: false, message: 'Not Found' }, 404);
}

export function handleError(err: HTTPExceptionWithErrors | Error, c: Context) {
    c.log.error(err);
    if (err instanceof HTTPExceptionWithErrors) {
        return c.json({ success: false, message: err.message, errors: err.errors }, err.status);
    } else {
        return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
}
