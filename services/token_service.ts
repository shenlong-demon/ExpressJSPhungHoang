import {User} from "./model";
import {Logger} from "../common";

const jwt = require('jsonwebtoken');

export class TokenService {
    static async getToken(user: User): Promise<string> {
        const secretKey = 'your_secret_key'; // Replace with your own secret key
        const payload = {
            userId: user.phone,
            username: user.name,
        };
        const token = jwt.sign(payload, secretKey);
        Logger.log(() => [`TokenService getToken`, user, token]);
        return token;
    }
}