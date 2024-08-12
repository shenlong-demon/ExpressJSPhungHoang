import { Logger } from '@core/common';

export class GlobalConfig {
	private static ENV: any = {};
	public static D1: any;
	public static init(env: any): void {
		GlobalConfig.ENV = env;
		GlobalConfig.D1 = env.DB;
	}
	public static JWT_SECRET_KEY(): string {
		return GlobalConfig.ENV.JWT_SECRET_KEY;
	}
}
