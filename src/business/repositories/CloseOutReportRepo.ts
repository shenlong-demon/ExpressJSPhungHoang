import { CloseOutReportEntity } from './model';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

export class CloseOutReportRepo {
	public static async update(entity: CloseOutReportEntity, fromTime: number, toTime: number): Promise<CloseOutReportEntity | null> {
		const exist = await prisma.phcloseoutreport.findFirst({
			where: {
				AND: [
					{
						date: {
							gte: fromTime,
						},
					},
					{
						date: {
							lte: toTime,
						},
					},
				],
			},
		});
		if (exist) {
			return prisma.phcloseoutreport.update({
				where: {
					id: exist.id,
				},
				data: {
					numberOfBill: entity.numberOfBill,
					totalBill: entity.totalBill,
					totalProfit: entity.totalProfit,
					totalDiscount: entity.totalDiscount,
					updatedAt: DateTimeUtils.now(),
				},
			});
		} else {
			return prisma.phcloseoutreport.create({
				data: {
					date: entity.date,
					numberOfBill: entity.numberOfBill,
					totalBill: entity.totalBill,
					totalProfit: entity.totalProfit,
					totalDiscount: entity.totalDiscount,
					createdAt: DateTimeUtils.now(),
					updatedAt: DateTimeUtils.now(),
				},
			});
		}
	}
}
