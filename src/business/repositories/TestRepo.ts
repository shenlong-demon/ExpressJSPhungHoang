import { prisma } from '../../../prisma/PrismaClient';
import { Logger } from '@core/common';

export class TestRepo {
	static async get(): Promise<any> {
		const userCount = await prisma.phuser.count();
		const data = { userCount, metadata: 1, migration: '0004_add_receiptAt_to_bill_table.sql', hash: '***9851b1', version: '1.0.1' };
		Logger.log(() => [`TestRepo get`, data]);
		return data;
	}
}
