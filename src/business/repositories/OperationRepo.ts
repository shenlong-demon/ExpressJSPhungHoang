import { OperationEntity } from './model';
import { CONSTANT, DB_CONSTANT, Logger } from '@core/common';
import { AssignCustomerRequest, CreateOperationRequest, SetOperationDiscountRequest, SetOperationEstimationRequest } from '@business/model';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

export class OperationRepo {
	static async create(req: CreateOperationRequest): Promise<OperationEntity | null> {
		const operation = await prisma.phoperation.create({
			data: {
				name: req.name || CONSTANT.STR_EMPTY,
				createdAt: DateTimeUtils.now(),
			},
		});
		return operation as OperationEntity;
	}

	static async getOperations(offset: number): Promise<OperationEntity[]> {
		Logger.log(() => [`OperationRepo getOperations ${offset}`]);
		const operation = await prisma.phoperation.findMany({
			orderBy: [
				{
					updatedAt: 'desc',
				},
			],
			skip: offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
		});
		return operation as OperationEntity[];
	}

	static async getOperation(id: number): Promise<OperationEntity | null> {
		Logger.log(() => [`OperationRepo getOperation ${id}`]);
		const op = await prisma.phoperation.findFirst({
			where: {
				id,
			},
			include: {
				employee: true,
				customer: true,
				bookings: {
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
		});
		Logger.log(() => [`OperationRepo getOperation ${id} RESULT`, op]);

		return op as OperationEntity;
	}

	static async assignCustomer(operationId: number, req: AssignCustomerRequest): Promise<OperationEntity | null> {
		Logger.log(() => [`OperationRepo assignCustomer ${operationId}`, req]);
		const op = await prisma.phoperation.update({
			where: {
				id: operationId,
			},
			data: {
				customerId: req.customerId,
			},
			include: {
				employee: true,
				customer: true,
				bookings: {
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
		});
		Logger.log(() => [`OperationRepo assignCustomer ${operationId} RESULT`, op]);

		return op as OperationEntity;
	}

	static async updateFinalOperation(operation: OperationEntity): Promise<OperationEntity | null> {
		Logger.log(() => [`OperationRepo updateFinalOperation `, operation]);

		const final: OperationEntity | null = await prisma.$transaction(async (prisma) => {
			// Update the total of the Operation
			// await prisma.phoperation.update({
			//     where: { id: operation.id },
			//     data: { profit: operation.profit },
			// });

			// Update the totals of each Booking
			// for (const booking of operation.bookings || []) {
			//     await prisma.phbooking.update({
			//         where: { id: booking.id },
			//         data: { profit: operation.profit},
			//     });
			// }
			return OperationRepo.getOperation(operation.id);
		});
		Logger.log(() => [`OperationRepo updateFinalOperation RESULT`, final]);

		return final;
	}

	static async setDiscount(operationId: number, req: SetOperationDiscountRequest): Promise<OperationEntity | null> {
		const update = await prisma.phoperation.update({
			where: {
				id: operationId,
			},
			data: {
				discount: req.discount,
			},
		});
		return OperationRepo.getOperation(operationId);
	}

	static async setEstimation(operationId: number, req: SetOperationEstimationRequest): Promise<OperationEntity | null> {
		const update = await prisma.phoperation.update({
			where: {
				id: operationId,
			},
			data: {
				estimation: req.newDate,
			},
		});
		return OperationRepo.getOperation(operationId);
	}
}
