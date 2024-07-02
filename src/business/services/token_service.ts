import {User} from "./model";
import {CONSTANT, Logger} from "../common";

const jwt = require('jsonwebtoken');

export class TokenService {
    private static SECRET_KEY = 'your_secret_key';
    static async getToken(user: User): Promise<string> {
        const payload = {
            userId: user.phone,
            username: user.name,
        };
        const token = jwt.sign(payload, TokenService.SECRET_KEY);
        Logger.log(() => [`TokenService getToken`, user, token]);
        return token;
    }

    static verifyToken(token: string): string | null {
        try {
            const decoded = jwt.verify(token.split(' ')[1], TokenService.SECRET_KEY);
            Logger.log(() => [`TokenService decoded  ${decoded}`, decoded]);
            return decoded.userId;
        } catch (error) {
            Logger.log(() => [`TokenService decoded  ${error}`, error]);
        }
        return CONSTANT.STR_EMPTY;
    }
}
