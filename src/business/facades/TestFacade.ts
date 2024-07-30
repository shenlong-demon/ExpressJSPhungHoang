import { TestService } from '@business/services';

export class TestFacade {
	static async get(): Promise<any> {
		return TestService.get();
	}
}
