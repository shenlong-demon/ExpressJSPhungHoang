import { prisma } from '../../../prisma/PrismaClient';
import { Logger } from '@core/common';

export class TestRepo {
	static async get(): Promise<any> {
		const userCount = await prisma.phuser.count();
		const data = {
			userCount,
			metadata: 1724118330709,
			migration: '0007_delete_table_group_and_brand.sql',
			hash: '***9851b1',
			version: '1.3.0',
			note: [
				'DELETE group and brand',
				'Filter Customer by Date',
				'Bill Filter with BillNo',
				'Return to Stock',
				'Rename Operation + DELETE Operation',
			],
		};
		Logger.log(() => [`TestRepo get`, data]);
		return data;
	}
}
