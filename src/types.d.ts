import { HTTPException } from 'hono/http-exception';
import { User } from './db/schema';

type UserContext = Omit<User, 'username' | 'email' | 'password' | 'created_at' | 'updated_at'>;

interface ErrorDetails {
    field: string;
    message: string;
}

declare module 'hono' {
    interface ContextVariableMap {
        user: UserContext;
    }
}

declare module 'hono/http-exception' {
    interface HTTPException {
        details?: ErrorDetails;
    }
}
