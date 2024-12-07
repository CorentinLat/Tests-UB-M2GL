import { FullUser, DisplayUser } from '../../../src/domain/entity/User';
import { IUserRepository } from '../../../src/domain/repository/IUserRepository';

export class SpecUserRepository implements IUserRepository {
    addUser(user: FullUser): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getUsers(): Promise<DisplayUser[]> {
        throw new Error('Method not implemented.');
    }

    getUserByEmail(email: string): Promise<FullUser | undefined> {
        throw new Error('Method not implemented.');
    }
}
