import { UserToCreate } from '../../domain/entity/User';

import { IUserRepository } from '../../domain/repository/IUserRepository';

import { AuthService } from '../../domain/service/AuthService';
import { IdService } from '../../domain/service/IdService';

import { validateUserCreation } from '../../domain/validator/user.validator';

export class UserService {
    constructor(private readonly _userRepository: IUserRepository) {}

    addNewUser = async (user: UserToCreate): Promise<boolean> => {
        if (!validateUserCreation(user)) return false;

        const { password, ...rest } = user;

        const id = IdService.generateId();
        const hashedPassword = await AuthService.hashPassword(password);

        return this._userRepository.addUser({
            id,
            ...rest,
            hashedPassword,
        });
    };

    logUser = async (email: string, password: string): Promise<string|null> => {
        const user = await this._userRepository.getUserByEmail(email);

        if (!user) return null;

        const comparisonResult = await AuthService.comparePassword(password, user.hashedPassword);
        if (!comparisonResult) return null;

        return AuthService.generateToken(user);
    };

    getUsers = () => this._userRepository.getUsers();
}
