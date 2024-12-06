import { Application } from '../../../../application/Application';

import { BaseRouter } from '../BaseRouter';
import { UserRouter } from './user/UserRouter';

import { loggedMiddleware } from '../../middleware/logged.middleware';

export class ApiRouter extends BaseRouter {
    constructor(application: Application) {
        super(
            'api',
            [new UserRouter(application.getUserService())],
            [loggedMiddleware],
        );
    }

    protected initRoutes() {}
}
