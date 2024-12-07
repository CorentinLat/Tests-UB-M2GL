import { RequestHandler, Response, Router } from 'express';

export abstract class BaseRouter {
    public router = Router();

    protected constructor(
        protected readonly name: string,
        protected readonly subRouters: BaseRouter[] = [],
        protected readonly middlewares: RequestHandler[] = [],
    ) {
        this.initSubRouters();
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    protected handleError(error: any, res: Response) {
        return res.status(500).json({ error: error.message });
    };

    private initSubRouters() {
        this.subRouters.forEach(router => {
            this.router.use(`/${ router.name }`, ...this.middlewares, router.router);
        });
    };
}
