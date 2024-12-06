import fs from 'fs';

import { IRepositories } from '../../domain/repository/IRepositories';
import { IUserRepository } from '../../domain/repository/IUserRepository';

import { JsonUserRepository } from './JsonUserRepository';

export class JsonRepositories implements IRepositories {
    private static readonly saveFolder = 'data';

    private readonly _userRepository: IUserRepository = new JsonUserRepository(JsonRepositories.saveFolder);

    constructor() {
        if (!fs.existsSync(JsonRepositories.saveFolder)) {
            fs.mkdirSync(JsonRepositories.saveFolder, { recursive: true });
        }
    }

    getUserRepository = (): IUserRepository => this._userRepository;
}
