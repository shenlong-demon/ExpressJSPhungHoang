import { BillEntity, ExpenseEntity } from './model';
import { CreateExpenseRequest, ExpenseFilterRequest, UpdateExpenseRequest } from '@business/model';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';
import { CONSTANT, DB_CONSTANT, Logger } from '@core/common';

export class ExpenseRepo {
	static async createExpense(req: CreateExpenseRequest): Promise<ExpenseEntity> {
		Logger.log(() => [`ExpenseRepo createExpense `, req]);

		const entity = await prisma.phexpense.create({
			data: {
				note: req.note,
				total: req.total,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		Logger.log(() => [`ExpenseRepo createExpense RETURN`, entity]);
		return entity as ExpenseEntity;
	}
	static async updateExpense(id: number, req: UpdateExpenseRequest): Promise<ExpenseEntity> {
		Logger.log(() => [`ExpenseRepo updateExpense ${id} `, req]);
		const entity = await prisma.phexpense.update({
			where: {
				id,
			},
			data: {
				note: req.note,
				total: req.total,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		Logger.log(() => [`ExpenseRepo updateExpense ${id}  RETURN`, entity]);

		return entity as ExpenseEntity;
	}
	static async deleteExpense(id: number): Promise<void> {
		Logger.log(() => [`ExpenseRepo deleteExpense ${id} `]);
		await prisma.phexpense.delete({
			where: {
				id,
			},
		});
	}

	static async getExpensesByPeriodOfTime(fromDate: number, toDate: number): Promise<ExpenseEntity[]> {
		Logger.log(() => [`ExpenseRepo getExpensesByPeriodOfTime fromDate ${fromDate}  toDate ${toDate}`]);

		const entities = await prisma.phexpense.findMany({
			where: {
				AND: [
					{
						createdAt: {
							gte: fromDate,
						},
					},
					{
						createdAt: {
							lte: toDate,
						},
					},
				],
			},
		});
		Logger.log(() => [`ExpenseRepo getExpensesByPeriodOfTime fromDate ${fromDate}  toDate ${toDate} RETURN `, entities]);

		return entities as ExpenseEntity[];
	}
	static async getExpenses(req: ExpenseFilterRequest): Promise<ExpenseEntity[]> {
		const gte: number = !!req.date ? DateTimeUtils.getStartOfDate(req.date) : 0;
		const lte: number = !!req.date ? DateTimeUtils.getEndOfDate(req.date) : DateTimeUtils.now();
		Logger.log(() => [`ExpenseRepo getExpenses getExpenses gte ${gte}    lte ${lte} `, req]);

		const entities = await prisma.phexpense.findMany({
			where: {
				OR: [
					{
						note: {
							contains: req.text || CONSTANT.STR_EMPTY,
						},
					},
					{
						AND: [
							{
								createdAt: {
									gte,
								},
							},
							{
								createdAt: {
									lte,
								},
							},
						],
					},
				],
			},

			skip: req.offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
		});
		Logger.log(() => [`ExpenseRepo getExpenses  RETURN `, entities]);

		return entities as ExpenseEntity[];
	}
}
