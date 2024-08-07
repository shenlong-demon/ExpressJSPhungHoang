export class GlobalConfig {
	private static ENV: any = {};
	public static init(env: any): void {
		GlobalConfig.ENV = env;
	}
	public static JWT_SECRET_KEY(): string {
		return GlobalConfig.ENV.JWT_SECRET_KEY;
	}
}
