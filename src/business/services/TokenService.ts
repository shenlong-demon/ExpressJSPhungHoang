import { User } from './model';

// @ts-ignore
import * as jwt from 'jsonwebtoken';
import { CONSTANT, Logger } from '@core/common';
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

	static verifyToken(authorization: string): string | null {
		const token: string = authorization.split(' ')[1];
		try {
			const decoded = jwt.verify(token, TokenService.SECRET_KEY);
			Logger.log(() => [`TokenService decoded ${TokenService.SECRET_KEY}  ${decoded}`, decoded, token]);
			return decoded.userId;
		} catch (error) {
			Logger.log(() => [`TokenService decoded ${TokenService.SECRET_KEY}  ${error}`, error, token]);
		}
		return CONSTANT.STR_EMPTY;
	}
}
