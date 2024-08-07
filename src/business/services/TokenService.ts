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

	static async verifyToken(token: string): Promise<string | null> {
		try {
			const decoded = await jwt.verify(token.split(' ')[1], TokenService.SECRET_KEY);
			Logger.log(() => [`TokenService decoded  ${decoded}`, decoded, token]);
			return decoded.userId;
		} catch (error) {
			Logger.log(() => [`TokenService decoded  ${error}`, error, token]);
		}
		return CONSTANT.STR_EMPTY;
	}
}
