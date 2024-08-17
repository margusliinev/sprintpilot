import { HTTPException } from 'hono/http-exception';

export class ForbiddenException extends HTTPException {
    constructor() {
        super(403, { message: 'Forbidden' });
    }
}

export class UnauthorizedException extends HTTPException {
    constructor() {
        super(401, { message: 'Unauthorized' });
    }
}

export class BadRequestException extends HTTPException {
    constructor() {
        super(400, { message: 'Bad Request' });
    }
}
