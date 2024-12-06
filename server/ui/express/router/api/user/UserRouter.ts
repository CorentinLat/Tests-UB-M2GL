import { Response, Request } from 'express';

import { UserService } from '../../../../../application/service/UserService';

import { BaseRouter } from '../../BaseRouter';

export class UserRouter extends BaseRouter {
    constructor(private readonly userService: UserService) {
        super('user');
    }

    protected initRoutes() {
        this.router.get('/', (req, res) => this.getUsers(req, res));
    }

    private getUsers = async (_: Request, res: Response) => {
        try {
            const users = await this.userService.getUsers();

            res.json(users);
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
