import { HTTPException } from 'hono/http-exception';
import { User, Session } from './db/schema';

type UserContext = Omit<User, 'username' | 'email' | 'password' | 'created_at' | 'updated_at'>;
type SessionContext = Omit<Session, 'expires_at' | 'created_at' | 'updated_at' | 'user_id'>;

declare module 'hono' {
    interface ContextVariableMap {
        user: UserContext;
        session: SessionContext;
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
