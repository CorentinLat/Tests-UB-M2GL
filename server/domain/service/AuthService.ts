import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { DisplayUser, FullUser } from '../entity/User';

export class AuthService {
    // Should be stored in a secure place
    private static readonly _jwtSecret = 'secret';

    static hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

    static comparePassword = (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);

    static generateToken = (user: FullUser): string => jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        AuthService._jwtSecret,
        { expiresIn: '1h' },
    );

    static verifyToken = (token: string): DisplayUser|null => {
        try {
            const decoded = jwt.verify(token, AuthService._jwtSecret) as DisplayUser;

            return {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
            };
        } catch {
            return null;
        }
    };
}
