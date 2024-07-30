import { prisma } from '../prisma/PrismaClient';

export class TestRepo {
	public static async get(): Promise<any> {
		const users = await prisma.phuser.findFirst();
		const count = await prisma.phuser.count();
		return { users, count };
	}
}
