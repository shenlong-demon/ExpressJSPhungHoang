import { BookingEntity, OperationEntity } from './model';
import { CONSTANT, DB_CONSTANT, Logger } from '@core/common';
import {
	AssignCustomerRequest,
	CreateOperationRequest,
	RemoveIssueRequest,
	RenameOperationRequest,
	SetOperationDiscountRequest,
	SetOperationEstimationRequest,
} from '@business/model';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

export class OperationRepo {
	private static FULL_OPERATION_INCLUDE: {
		employee: true;
		customer: true;
		bookings: {
			include: {
				product: true;
			};
		};
		issues: true;
	};
	static async create(req: CreateOperationRequest): Promise<OperationEntity | null> {
		const operation = await prisma.phoperation.create({
			data: {
				name: req.name || CONSTANT.STR_EMPTY,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
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
		const op = await prisma.phoperation.findUnique({
			where: {
				id,
			},
			include: {
				employee: true,
				customer: true,
				bookings: {
					include: {
						product: true,
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
				updatedAt: DateTimeUtils.now(),
			},
		});
		Logger.log(() => [`OperationRepo assignCustomer ${operationId} RESULT`, op]);

		return OperationRepo.getOperation(operationId);
	}

	static async setDiscount(operationId: number, req: SetOperationDiscountRequest): Promise<OperationEntity | null> {
		const update = await prisma.phoperation.update({
			where: {
				id: operationId,
			},
			data: {
				discount: req.discount,
				updatedAt: DateTimeUtils.now(),
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
				updatedAt: DateTimeUtils.now(),
			},
		});
		return OperationRepo.getOperation(operationId);
	}
	static async removeIssue(operationId: number, req: RemoveIssueRequest): Promise<OperationEntity | null> {
		const remove = await prisma.phoperationissue.delete({
			where: {
				id: req.issueId,
			},
		});
		return OperationRepo.getOperation(operationId);
	}

	static async deleteOperation(operationId: number, shouldReturnToStock: boolean): Promise<void> {
		const op: OperationEntity | null = await OperationRepo.getOperation(operationId);
		if (!!op && shouldReturnToStock) {
			// NOTE: Return to stock
			const bookings: BookingEntity[] = op.bookings;
			for (let i = 0; i < bookings.length; i++) {
				const booking: BookingEntity = bookings[i];
				if (!!booking.productId) {
					await prisma.phproduct.update({
						where: { id: booking.productId },
						data: { quantity: { increment: booking.quantity }, updatedAt: DateTimeUtils.now() },
					});
				}
			}
		}
		const deleteBookings = await prisma.phbooking.deleteMany({
			where: { operationId: operationId },
		});
		const deleteIssues = await prisma.phoperationissue.deleteMany({
			where: { operationId: operationId },
		});
		const deleteOperation = await prisma.phoperation.delete({
			where: { id: operationId },
		});
	}

	static async renameOperation(operationId: number, req: RenameOperationRequest): Promise<OperationEntity | null> {
		const update = await prisma.phoperation.update({
			where: {
				id: operationId,
			},
			data: {
				name: req.name,
				updatedAt: DateTimeUtils.now(),
			},
		});
		return OperationRepo.getOperation(operationId);
	}
}
