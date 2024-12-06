import { NextFunction, Response, Request, RequestHandler } from 'express';

import { AuthService } from '../../../domain/service/AuthService';

export const loggedMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.sendStatus(401);
        return;
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }

    const user = AuthService.verifyToken(token);
    if (user) {
        req.user = user;
        return next();
    }

    res.sendStatus(401);
};
