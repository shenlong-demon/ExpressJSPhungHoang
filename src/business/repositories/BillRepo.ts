import { BillEntity, BillIssueEntity, OrderEntity } from './model';
import { Logger } from '@core/common';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';
import { CustomerRepo } from '@business/repositories/CustomerRepo';
import { OperationRepo } from '@business/repositories/OperationRepo';

export class BillRepo {
	static async getBill(id: number): Promise<BillEntity | null> {
		Logger.log(() => [`BillRepo getBill ${id}`]);
		const op = await prisma.phbill.findFirst({
			where: {
				id,
			},
			include: {
				employee: true,
				customer: true,
				orders: {
					include: {
						product: {
							include: {
								brand: false,
								group: false,
							},
						},
					},
				},
			},
		});
		Logger.log(() => [`BillRepo getBill ${id} RESULT`, op]);

		return op as BillEntity | null;
	}
	static async create(bill: BillEntity): Promise<BillEntity | null> {
		const { id, customer, employee, orders, issues, total, profit, ...newBill } = {
			...bill,
		};
		const finalBill = await prisma.phbill.create({
			data: { ...newBill, total: 0, profit: 0 },
		});
		try {
			await BillRepo.addOrders(finalBill.id, orders);
			await BillRepo.addBillIssues(finalBill.id, issues);

			if (bill.customerId) {
				await CustomerRepo.updateTotal(bill.customerId, total);
			}

			const finalUpdateBill = await prisma.phbill.update({
				where: {
					id: finalBill.id,
				},
				data: {
					total: bill.total,
					profit: bill.profit,
					updatedAt: DateTimeUtils.now(),
				},
			});
			await OperationRepo.deleteOperation(bill.operationId);

			return BillRepo.getBill(bill.id);
		} catch (ex) {
			Logger.log(() => [`BillRepo create ERROR `, ex]);
			await BillRepo.deleteBill(finalBill.id);
			return null;
		}
	}
	private static async deleteBill(billId: number): Promise<void> {
		await prisma.phorder.deleteMany({
			where: {
				billId: billId,
			},
		});
		await prisma.phbillissue.deleteMany({
			where: {
				billId: billId,
			},
		});
		await prisma.phbill.delete({
			where: {
				id: billId,
			},
		});
	}

	private static async addOrders(billId: number, orders: OrderEntity[]): Promise<void> {
		const orderMany = await prisma.phorder.createMany({
			data: (orders || []).map((order: OrderEntity): any => {
				const { id, product, ...newOrder } = {
					...order,
					billId: billId,
				};
				return newOrder;
			}),
		});
	}
	private static async addBillIssues(billId: number, issues: BillIssueEntity[]): Promise<void> {
		const issueMany = await prisma.phbillissue.createMany({
			data: (issues || []).map((issue: BillIssueEntity): any => {
				const { id, ...newIssue } = {
					...issue,
					billId: billId,
				};
				return newIssue;
			}),
		});
	}
}
