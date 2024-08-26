import { HTTPException } from 'hono/http-exception';
import { User, Session } from './db/schema';
import { ErrorLogger } from './utils';
import { Context } from 'hono';

type UserContext = { id: User['id'] };
type SessionContext = { id: Session['id'] };

declare module 'hono' {
    interface ContextVariableMap {
        user: UserContext;
        session: SessionContext;
    }

    interface Context {
        errorLogger: ErrorLogger;
    }
}

interface ErrorDetails {
    field: string;
    message: string;
}

declare module 'hono/http-exception' {
    interface HTTPException {
        details?: ErrorDetails;
    }
}
