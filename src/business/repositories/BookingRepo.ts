import { BookingEntity, OperationEntity } from './model';
import { CONSTANT, Logger } from '@core/common';
import { BookingRequestSdo } from '@business/repositories/request';
import { AddOperationServiceRequest, CancelBookingRequest, SetBookingNoteRequest } from '@business/model';
import { OperationRepo } from '@business/repositories/OperationRepo';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

export class BookingRepo {
	static async booking(operationId: number, req: BookingRequestSdo): Promise<BookingEntity> {
		Logger.log(() => [`BookingRepo booking ${operationId}`, req]);
		const quantity: number = req.quantity;
		const finalBooking = await prisma.$transaction(async (prisma) => {
			await prisma.phproduct.update({
				where: { id: req.productId },
				data: { quantity: { increment: quantity * -1 } },
			});

			const bookingItem = await prisma.phbooking.create({
				data: {
					productId: req.productId,
					operationId: operationId,
					price: req.price,
					quantity,
					name: req.productName,
					note: CONSTANT.STR_EMPTY,
					createdAt: DateTimeUtils.now(),
					// profit: (req.price - req.basePrice) * quantity
				},
				include: {
					operation: {
						include: {
							bookings: {
								include: {
									product: true,
								},
							},
						},
					},
				},
			});
			return bookingItem;
		});
		Logger.log(() => [`BookingRepo booking ${operationId} RESULT`, finalBooking]);

		return finalBooking as BookingEntity;
	}

	static async addService(operationId: number, req: AddOperationServiceRequest): Promise<BookingEntity> {
		Logger.log(() => [`BookingRepo addService ${operationId}`, req]);

		const bookingItem = await prisma.phbooking.create({
			data: {
				productId: null,
				operationId: operationId,
				price: req.price,
				quantity: 1,
				name: req.name,
				note: req.note,
				createdAt: DateTimeUtils.now(),
			},
			include: {
				operation: {
					include: {
						bookings: {
							include: {
								product: true,
							},
						},
					},
				},
			},
		});

		Logger.log(() => [`BookingRepo addService ${operationId} RESULT`, bookingItem]);

		return bookingItem as BookingEntity;
	}

	static async cancelBooking(operationId: number, req: CancelBookingRequest): Promise<OperationEntity> {
		const bookingItem = await prisma.phbooking.delete({
			where: {
				id: req.bookingId,
			},
		});
		const finalOperation = await OperationRepo.getOperation(operationId);
		return finalOperation as OperationEntity;
	}

	static async setBookingNote(operationId: number, req: SetBookingNoteRequest): Promise<OperationEntity> {
		const bookingItem = await prisma.phbooking.update({
			where: {
				id: req.bookingId,
				updatedAt: DateTimeUtils.now(),
			},
			data: {
				note: req.note,
			},
		});
		const finalOperation = await OperationRepo.getOperation(operationId);
		return finalOperation as OperationEntity;
	}
}
