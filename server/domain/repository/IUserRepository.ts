import { DisplayUser, FullUser } from '../entity/User';

export interface IUserRepository {
    addUser(user: FullUser): Promise<boolean>;
    getUsers(): Promise<DisplayUser[]>;
    getUserByEmail(email: string): Promise<FullUser | undefined>;
}
