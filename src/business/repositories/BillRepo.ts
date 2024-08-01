import { BillEntity, BillIssueEntity, OrderEntity } from './model';
import { Logger } from '@core/common';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

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
			const orderMany = await prisma.phorder.createMany({
				data: (bill.orders || []).map((order: OrderEntity): any => {
					const { id, product, ...newOrder } = {
						...order,
						billId: finalBill.id,
					};
					return newOrder;
				}),
			});

			const issueMany = await prisma.phbillissue.createMany({
				data: (bill.issues || []).map((issue: BillIssueEntity): any => {
					const { id, ...newIssue } = {
						...issue,
						billId: finalBill.id,
					};
					return newIssue;
				}),
			});

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
			if (bill.customerId) {
				const updateCustomer = await prisma.phcustomer.update({
					where: {
						id: bill.customerId,
					},
					data: {
						total: { increment: bill.total },
						updatedAt: DateTimeUtils.now(),
					},
				});
			}
			const deleteBookings = await prisma.phbooking.deleteMany({
				where: { operationId: bill.operationId },
			});
			const deleteIssues = await prisma.phoperationissue.deleteMany({
				where: { operationId: bill.operationId },
			});
			const deleteOperation = await prisma.phoperation.delete({
				where: { id: bill.operationId },
			});
			return BillRepo.getBill(bill.id);
		} catch (ex) {
			Logger.log(() => [`BillRepo create ERROR `, ex]);
			const finalBill = await prisma.phbill.delete({
				where: {
					id: bill.id,
				},
			});
			return null;
		}
	}
}
