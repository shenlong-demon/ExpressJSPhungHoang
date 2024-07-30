import { BillEntity } from './model';
import { Logger } from '@core/common';
import { prisma } from '../../../prisma/PrismaClient';

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
		try {
			const final: BillEntity | null = await prisma.$transaction(async (prismaTrans) => {
				const { id, customer, employee, orders, issues, ...newBill } = {
					...bill,
				};
				// Update the total of the Operation
				const finalBill = await prismaTrans.phbill.create({
					data: newBill,
				});
				// // Update the totals of each Booking
				for (const order of bill.orders || []) {
					const { id, product, ...newOrder } = {
						...order,
						billId: finalBill.id,
					};
					await prismaTrans.phorder.create({
						data: newOrder,
					});
				}
				for (const issue of bill.issues || []) {
					const { id, ...newIssue } = {
						...issue,
						billId: finalBill.id,
					};
					await prismaTrans.phbillissue.create({
						data: newIssue,
					});
				}
				return BillRepo.getBill(finalBill.id);
			});
			Logger.log(() => [`BillRepo create RESULT`, final]);
			return final;
		} catch (e) {
			Logger.log(() => [`BillRepo create ERROR`, e]);
		}
		return null;
	}
}
