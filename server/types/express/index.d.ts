import { DisplayUser } from '../../domain/entity/User';

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: DisplayUser;
        }
    }
}
