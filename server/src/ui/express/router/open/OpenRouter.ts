import { Response, Request } from 'express';

import { Application } from '../../../../application/Application';
import { UserService } from '../../../../application/service/UserService';

import { BaseRouter } from '../BaseRouter';

export class OpenRouter extends BaseRouter {
    private readonly _userService: UserService;

    constructor(application: Application) {
        super('open');

        this._userService = application.getUserService();
    }

    protected initRoutes() {
        this.router.post('/login', (req, res) => this.postLogin(req, res));
        this.router.post('/register', (req, res) => this.postRegister(req, res));
    }

    private postLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const token = await this._userService.logUser(email, password);

            if (token)
                res.json({ token });
            else
                res.sendStatus(401);
        } catch (error: any) {
            this.handleError(error, res);
        }
    };

    private postRegister = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const created = await this._userService.addNewUser({ name, email, password });

            if (created)
                res.sendStatus(201);
            else
                res.sendStatus(400);
        } catch (error: any) {
            this.handleError(error, res);
        }
    };
}
