import { BillEntity, BillIssueEntity, OrderEntity, ProductEntity } from './model';
import { CONSTANT, DB_CONSTANT, Logger } from '@core/common';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils, GlobalConfig } from '@business/common';
import { CustomerRepo } from '@business/repositories/CustomerRepo';
import { OperationRepo } from '@business/repositories/OperationRepo';
import { BillsFilterRequest } from '@business/model';

export class BillRepo {
	public static async getBills(fromDate: number, toDate: number): Promise<BillEntity[]> {
		Logger.log(() => [`BillRepo getBills fromDate ${fromDate}  toDate ${toDate}`]);

		const bills = await prisma.phbill.findMany({
			where: {
				AND: [
					{
						receiptedAt: {
							gte: fromDate,
						},
					},
					{
						receiptedAt: {
							lte: toDate,
						},
					},
				],
			},
		});
		return bills as BillEntity[];
	}
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
			data: { ...newBill, total: 0, profit: 0, discount: 0, receiptedAt: DateTimeUtils.now() },
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
					discount: bill.discount,
					updatedAt: DateTimeUtils.now(),
				},
			});
			await OperationRepo.deleteOperation(bill.operationId, false);

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

	public static async getBillsBy(req: BillsFilterRequest): Promise<BillEntity[]> {
		Logger.log(() => [`BillRepo getBillsBy `, req]);
		const billNo: number = Number(req.text);
		const notBillNo: boolean = isNaN(billNo);
		const extraTime: number = 2 * 60 * 60 * 1000;
		const gte: number = !!req.date ? req.date - extraTime : 0;
		const lte: number = !!req.date ? req.date + extraTime : DateTimeUtils.now();
		Logger.log(() => [`BillRepo getBillsBy gte ${gte}      lte ${lte} `, req]);

		const bills = await prisma.phbill.findMany({
			where: {
				AND: [
					{
						OR: [
							{
								id: notBillNo ? -1 : billNo,
							},
							{
								name: {
									contains: req.text || CONSTANT.STR_EMPTY,
								},
							},
							{
								customer: {
									name:
										req.text === null || req.text === CONSTANT.STR_EMPTY
											? undefined
											: {
													contains: req.text,
												},
								},
							},
							{
								customer: {
									phone:
										req.text === null || req.text === CONSTANT.STR_EMPTY
											? undefined
											: {
													contains: req.text,
												},
								},
							},
						],
					},

					{
						receiptedAt: {
							gte,
						},
					},
					{
						receiptedAt: {
							lte,
						},
					},
				],
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
				issues: true,
			},
			skip: req.offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
			orderBy: [
				{
					receiptedAt: 'desc',
				},
			],
		});
		Logger.log(() => [`BillRepo getBillsBy RETURN `, bills]);
		return bills as BillEntity[];
	}
}
