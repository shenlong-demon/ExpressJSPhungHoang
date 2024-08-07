import { User } from './model';

// @ts-ignore
import * as jwt from 'jsonwebtoken';
import { CONSTANT, Logger } from '@core/common';
import { GlobalConfig } from '@business/common';
export class TokenService {
	static async getToken(user: User): Promise<string> {
		const payload = {
			userId: user.phone,
			username: user.name,
		};
		const token = jwt.sign(payload, GlobalConfig.JWT_SECRET_KEY());
		Logger.log(() => [`TokenService getToken ${GlobalConfig.JWT_SECRET_KEY()}`, user, token]);
		return token;
	}

	static verifyToken(authorization: string): string | null {
		const token: string = authorization.split(' ')[1];
		try {
			const decoded = jwt.verify(token, GlobalConfig.JWT_SECRET_KEY());
			Logger.log(() => [`TokenService decoded ${GlobalConfig.JWT_SECRET_KEY()}  ${decoded}`, decoded, token]);
			return decoded.userId;
		} catch (error) {
			Logger.log(() => [`TokenService decoded ${GlobalConfig.JWT_SECRET_KEY()}  ${error}`, error, token]);
		}
		return CONSTANT.STR_EMPTY;
	}
}
