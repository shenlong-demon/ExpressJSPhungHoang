import {Logger} from "../common";
import {TokenService} from "../services";

const jwt = require('jsonwebtoken');
const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.header('Authorization');
    Logger.log(() => [`authMiddleware token  ${token}`]);
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    const userId: string | null = TokenService.verifyToken(token);
    if(!!userId){
        req.userId = userId;
        next();
    }
    else {
        res.status(401).json({error: 'Invalid token'});
    }
};

module.exports = authMiddleware;
