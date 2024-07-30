import { TestRepo } from '@business/repositories';

export class TestService {
	static async get(): Promise<any> {
		return TestRepo.get();
	}
}
