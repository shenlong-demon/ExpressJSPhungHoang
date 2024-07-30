import { prisma } from '../../../prisma/PrismaClient';

export class TestRepo {
	static async get(): Promise<any> {
		const user = await prisma.phuser.findFirst();
		const count = await prisma.phuser.count();
		return { user, count, metadata: 1 };
	}
}
