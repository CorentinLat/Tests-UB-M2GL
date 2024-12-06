import { Application } from '../../../application/Application';

import { BaseRouter } from './BaseRouter';
import { ApiRouter } from './api/ApiRouter';
import { OpenRouter } from './open/OpenRouter';

export class MainRouter extends BaseRouter {
    constructor(application: Application) {
        super('', [
            new ApiRouter(application),
            new OpenRouter(application),
        ]);
    }

    protected initRoutes () {}
}
