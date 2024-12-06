import { IInfra } from '../domain/IInfra';

import { UserService } from './service/UserService';

export class Application {
    private readonly _userService: UserService;

    constructor(infra: IInfra) {
        this._userService = new UserService(infra.getRepositories().getUserRepository());
    }

    getUserService = (): UserService => this._userService;
}
