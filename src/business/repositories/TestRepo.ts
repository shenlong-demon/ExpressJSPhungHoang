import { prisma } from '../../../prisma/PrismaClient';
import { Logger } from '@core/common';

export class TestRepo {
	static async get(): Promise<any> {
		const user = await prisma.phuser.findFirst();
		const count = await prisma.phuser.count();
		const data = { user, count, metadata: 1 };
		Logger.log(() => [`TestRepo get`, data]);
		return data;
	}
}
