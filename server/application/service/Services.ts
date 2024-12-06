import { UserService } from './UserService';
import { Infra } from '../../infra/Infra';

export class Services {
    private readonly _userService: UserService;

    constructor(infra: Infra) {
        this._userService = new UserService(infra.getRepositories().getUserRepository());
    }

    getUserService = (): UserService => this._userService;
}
