import type { User, NewUser } from './users.schema';
import type { Session, NewSession } from './sessions.schema';
import { usersTable } from './users.schema';
import { sessionsTable } from './sessions.schema';

export { usersTable, sessionsTable };
export type { User, NewUser, Session, NewSession };
