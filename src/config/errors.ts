import { HTTPException } from 'hono/http-exception';

interface ValidationError {
    field: string;
    message: string;
}
export class BadRequestException extends HTTPException {
    error: ValidationError;

    constructor(error: ValidationError) {
        super(400, { message: 'Bad Request' });
        this.error = error;
    }
}

export class UnauthorizedException extends HTTPException {
    constructor() {
        super(401, { message: 'Unauthorized' });
    }
}

export class ForbiddenException extends HTTPException {
    constructor() {
        super(403, { message: 'Forbidden' });
    }
}

export class NotFoundException extends HTTPException {
    constructor() {
        super(404, { message: 'Not Found' });
    }
}

export class MethodNotAllowedException extends HTTPException {
    constructor() {
        super(405, { message: 'Method Not Allowed' });
    }
}

export class ConflictException extends HTTPException {
    constructor() {
        super(409, { message: 'Conflict' });
    }
}

export class UnprocessableEntityException extends HTTPException {
    constructor() {
        super(422, { message: 'Unprocessable Entity' });
    }
}

export class TooManyRequestsException extends HTTPException {
    constructor() {
        super(429, { message: 'Too Many Requests' });
    }
}

export class InternalServerErrorException extends HTTPException {
    constructor() {
        super(500, { message: 'Internal Server Error' });
    }
}

export class ServiceUnavailableException extends HTTPException {
    constructor() {
        super(503, { message: 'Service Unavailable' });
    }
}
