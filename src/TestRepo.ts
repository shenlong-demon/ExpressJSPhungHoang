import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export class TestRepo {
	public static async get(d1: any): Promise<any> {
		const prisma = new PrismaClient({
			adapter: new PrismaD1(d1),
		});
		const users = await prisma.phuser.findFirst();
		return users;
	}
}
