import { prisma } from '../../../prisma/PrismaClient';
import { Logger } from '@core/common';

export class TestRepo {
	static async get(): Promise<any> {
		const userCount = await prisma.phuser.count();
		const data = {
			userCount,
			metadata: 1724118330709,
			migration: '0004_add_receiptAt_to_bill_table.sql',
			hash: '***9851b1',
			version: '1.2.1',
			note: ['Filter Customer by Date', 'Bill Filter with BillNo', 'Return to Stock', 'Rename Operation + DELETE Operation'],
		};
		Logger.log(() => [`TestRepo get`, data]);
		return data;
	}
}
