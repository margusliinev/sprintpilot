import { HTTPException } from 'hono/http-exception';
import { ErrorDetails } from '../types';

enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    REQUEST_ENTITY_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505
}

function createHttpException(status: HttpStatus, defaultMessage: string) {
    return class extends HTTPException {
        public details?: ErrorDetails;

        constructor(details?: ErrorDetails) {
            super(status, { message: defaultMessage });
            this.details = details;
        }
    };
}

export class BadRequestException extends createHttpException(HttpStatus.BAD_REQUEST, 'Bad Request') {}
export class UnauthorizedException extends createHttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized') {}
export class PaymentRequiredException extends createHttpException(HttpStatus.PAYMENT_REQUIRED, 'Payment Required') {}
export class ForbiddenException extends createHttpException(HttpStatus.FORBIDDEN, 'Forbidden') {}
export class NotFoundException extends createHttpException(HttpStatus.NOT_FOUND, 'Not Found') {}
export class MethodNotAllowedException extends createHttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method Not Allowed') {}
export class NotAcceptableException extends createHttpException(HttpStatus.NOT_ACCEPTABLE, 'Not Acceptable') {}
export class ProxyAuthenticationRequiredException extends createHttpException(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, 'Proxy Authentication Required') {}
export class RequestTimeoutException extends createHttpException(HttpStatus.REQUEST_TIMEOUT, 'Request Timeout') {}
export class ConflictException extends createHttpException(HttpStatus.CONFLICT, 'Conflict') {}
export class GoneException extends createHttpException(HttpStatus.GONE, 'Gone') {}
export class LengthRequiredException extends createHttpException(HttpStatus.LENGTH_REQUIRED, 'Length Required') {}
export class PreconditionFailedException extends createHttpException(HttpStatus.PRECONDITION_FAILED, 'Precondition Failed') {}
export class RequestEntityTooLargeException extends createHttpException(HttpStatus.REQUEST_ENTITY_TOO_LARGE, 'Request Entity Too Large') {}
export class RequestUriTooLongException extends createHttpException(HttpStatus.REQUEST_URI_TOO_LONG, 'Request URI Too Long') {}
export class UnsupportedMediaTypeException extends createHttpException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, 'Unsupported Media Type') {}
export class RequestedRangeNotSatisfiableException extends createHttpException(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, 'Requested Range Not Satisfiable') {}
export class ExpectationFailedException extends createHttpException(HttpStatus.EXPECTATION_FAILED, 'Expectation Failed') {}
export class ImATeapotException extends createHttpException(HttpStatus.IM_A_TEAPOT, 'I’m a Teapot') {}
export class MisdirectedRequestException extends createHttpException(HttpStatus.MISDIRECTED_REQUEST, 'Misdirected Request') {}
export class UnprocessableEntityException extends createHttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Unprocessable Entity') {}
export class LockedException extends createHttpException(HttpStatus.LOCKED, 'Locked') {}
export class FailedDependencyException extends createHttpException(HttpStatus.FAILED_DEPENDENCY, 'Failed Dependency') {}
export class UpgradeRequiredException extends createHttpException(HttpStatus.UPGRADE_REQUIRED, 'Upgrade Required') {}
export class PreconditionRequiredException extends createHttpException(HttpStatus.PRECONDITION_REQUIRED, 'Precondition Required') {}
export class TooManyRequestsException extends createHttpException(HttpStatus.TOO_MANY_REQUESTS, 'Too Many Requests') {}
export class RequestHeaderFieldsTooLargeException extends createHttpException(HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, 'Request Header Fields Too Large') {}
export class InternalServerErrorException extends createHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error') {}
export class NotImplementedException extends createHttpException(HttpStatus.NOT_IMPLEMENTED, 'Not Implemented') {}
export class BadGatewayException extends createHttpException(HttpStatus.BAD_GATEWAY, 'Bad Gateway') {}
export class ServiceUnavailableException extends createHttpException(HttpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable') {}
export class GatewayTimeoutException extends createHttpException(HttpStatus.GATEWAY_TIMEOUT, 'Gateway Timeout') {}
export class HttpVersionNotSupportedException extends createHttpException(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, 'HTTP Version Not Supported') {}
