import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

module.exports = function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    let token;
    if (authHeader) {
        token = authHeader.split(' ')[1];
    } else {
        token = null;
    }
    if (token == null) return res.sendStatus(401);
    console.log('Token found');
    jwt.verify(token, process.env.SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);

        next();
    });
};
