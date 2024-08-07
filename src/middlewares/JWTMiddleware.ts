import { TokenService } from '@business/services';
import { Context, Next } from 'hono';
import { Logger } from '@core/common';

const jwtAuth = async (c: Context, next: Next) => {
	const authHeader = c.req.header('Authorization');
	Logger.log(() => [`JWTMiddleware authHeader ${authHeader}`]);
	if (!authHeader) {
		return c.json({ message: 'No token provided' }, 401);
	}

	try {
		const userId: string | null = TokenService.verifyToken(authHeader);
		if (userId) {
			// c.req.token = token;
			await next();
		}
	} catch (err) {
		return c.json({ message: 'Failed to authenticate token' }, 401);
	}
};
export { jwtAuth };
