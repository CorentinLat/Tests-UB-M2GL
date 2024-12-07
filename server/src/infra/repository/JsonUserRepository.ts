import { DisplayUser, FullUser } from '../../domain/entity/User';

import { IUserRepository } from '../../domain/repository/IUserRepository';

import { JsonRepository } from './JsonRepository';

export class JsonUserRepository extends JsonRepository<FullUser> implements IUserRepository {
    constructor(folder: string) {
        super(folder, 'user');
    }

    async addUser(user: FullUser): Promise<boolean> {
        return this.add(user);
    }

    async getUsers(): Promise<DisplayUser[]> {
        const users = await this.readJson();
        return users.map(({ hashedPassword, ...rest }) => rest);
    }

    async getUserByEmail(email: string): Promise<FullUser | undefined> {
        const users = await this.readJson();
        return users.find(user => user.email === email);
    }
}
