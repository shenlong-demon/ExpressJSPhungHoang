import { Dto, Logger } from '@core/common';
import { BillRepo, BookingRepo, OperationIssueRepo, OperationRepo } from '@business/repositories';
import { Bill, Operation, Product } from '@business/services/model';
import {
	BillEntity,
	BillIssueEntity,
	BookingEntity,
	OperationEntity,
	OperationIssueEntity,
	OrderEntity,
	ProductEntity,
} from '@business/repositories/model';
import { DateTimeUtils, ERROR_CODE, WARNING_CODE } from '@business/common';
import { BookingRequestSdo } from '@business/repositories/request';
import {
	AddOperationServiceRequest,
	AssignCustomerRequest,
	CancelBookingRequest,
	CreateOperationIssue,
	CreateOperationRequest,
	RemoveIssueRequest,
	RenameOperationRequest,
	SetBookingNoteRequest,
	SetOperationDiscountRequest,
	SetOperationEstimationRequest,
} from '@business/model';

export class OperationService {
	static async createOperation(req: CreateOperationRequest): Promise<Dto<Operation | null>> {
		const newOperation: OperationEntity | null = await OperationRepo.create(req);
		return Dto.success(newOperation);
	}

	static async getOperations(offset: number): Promise<Dto<Operation[]>> {
		const operations: OperationEntity[] = await OperationRepo.getOperations(offset);
		return Dto.success(operations);
	}

	static async getOperation(id: number): Promise<Dto<Operation | null>> {
		const operation: OperationEntity | null = await OperationRepo.getOperation(id);
		if (!!operation) {
			return Dto.success(operation);
		}
		return Dto.error(ERROR_CODE.OPERATION_NOT_EXIST);
	}

	static async booking(operationId: number, product: Product): Promise<Dto<Operation | null>> {
		const booking: BookingEntity = await BookingRepo.booking(operationId, {
			productId: product.id,
			productName: product.name,
			price: product.price,
			basePrice: product.basePrice,
			quantity: 1,
		} as BookingRequestSdo);
		if (booking.product?.quantity || 0 < 5) {
			return Dto.warning<Operation>(
				WARNING_CODE.PRODUCT_QUANTITY_READY_OUT_OF_STOCK,
				`${booking.name}'s quantity is ${booking.product?.quantity || 0}`,
				await OperationRepo.getOperation(operationId),
			);
		}
		return Dto.success(await OperationRepo.getOperation(operationId));
	}

	static async assignCustomer(operationId: number, req: AssignCustomerRequest): Promise<Dto<Operation | null>> {
		const operation: OperationEntity | null = await OperationRepo.assignCustomer(operationId, req);
		if (!!operation) {
			return Dto.success(operation);
		}
		return Dto.error(ERROR_CODE.OPERATION_NOT_EXIST);
	}

	static async prepareReceipt(operationId: number): Promise<Dto<Bill | null>> {
		const operation: OperationEntity | null = await OperationRepo.getOperation(operationId);
		if (!!operation) {
			const bill: BillEntity = {
				id: operation.id,
				operationId: operation.id,
				appKey: operation.appKey,
				createdAt: operation.createdAt,
				updatedAt: operation.updatedAt,
				name: operation.name,
				phone: operation.phone,
				note: operation.note,
				discount: operation.discount,
				customerId: operation.customerId,
				employeeId: operation.employeeId,
				orders: [],
				issues: [],
				estimation: operation.estimation,
				profit: 0,
				total: 0,
				customer: operation.customer,
				employee: operation.employee,
				receiptedAt: DateTimeUtils.now(),
			};
			let operationProfit: number = 0;
			let operationTotal: number = 0;
			const bookings: BookingEntity[] = operation.bookings || [];

			for (const booking of bookings) {
				let bookingProfit: number = 0;
				let basePrice: number = 0;
				const product: ProductEntity | null | undefined = booking.product;

				if (!!product) {
					basePrice = product.basePrice;
					bookingProfit = (booking.price - product.basePrice) * booking.quantity;
				} else {
					basePrice = 0;
					bookingProfit = booking.price * booking.quantity;
				}
				const bookingTotal: number = booking.price * booking.quantity;
				operationProfit += bookingProfit;
				operationTotal += bookingTotal;

				const order: OrderEntity = {
					id: booking.id,
					bookingId: booking.id,
					appKey: booking.appKey,
					createdAt: booking.createdAt,
					updatedAt: booking.updatedAt,
					name: booking.name,
					note: booking.note,
					price: booking.price,
					basePrice: basePrice,
					quantity: booking.quantity,
					profit: bookingProfit,
					total: bookingTotal,
					productId: booking.productId,
					product: booking.product,
					billId: bill.id,
				};
				bill.orders.push(order);
			}
			bill.profit = operationProfit - operation.discount;
			bill.total = operationTotal - operation.discount;
			Logger.log(() => [`OperationService prepareReceipt operation`, operation, bill]);

			const issues: OperationIssueEntity[] = operation.issues || [];
			for (const issue of issues) {
				const billIssue: BillIssueEntity = {
					id: issue.id,
					operationIssueId: issue.id,
					appKey: issue.appKey,
					createdAt: issue.createdAt,
					updatedAt: issue.updatedAt,
					billId: bill.id,
					note: issue.note,
					image: issue.image,
				};
				bill.issues.push(billIssue);
			}

			// const finalOperation : OperationEntity | null = await OperationRepo.updateFinalOperation(operation);
			const billEntity: BillEntity | null = await BillRepo.create(bill);
			return Dto.success(billEntity);
		}
		return Dto.success(operation);
	}

	static async createIssue(operationId: number, req: CreateOperationIssue): Promise<Dto<Operation | null>> {
		const issue: OperationIssueEntity = await OperationIssueRepo.createIssue(operationId, req);
		return Dto.success(await OperationRepo.getOperation(operationId));
	}

	static async addService(operationId: number, req: AddOperationServiceRequest): Promise<Dto<Operation | null>> {
		const booking: BookingEntity = await BookingRepo.addService(operationId, req);
		return Dto.success(await OperationRepo.getOperation(operationId));
	}

	static async cancelBooking(operationId: number, req: CancelBookingRequest): Promise<Dto<Operation | null>> {
		const operation: OperationEntity = await BookingRepo.cancelBooking(operationId, req);
		return Dto.success(operation);
	}

	static async setBookingNote(operationId: number, req: SetBookingNoteRequest): Promise<Dto<Operation | null>> {
		const operation: OperationEntity = await BookingRepo.setBookingNote(operationId, req);
		return Dto.success(operation);
	}

	static async setDiscount(operationId: number, req: SetOperationDiscountRequest): Promise<Dto<Operation | null>> {
		const operation: OperationEntity | null = await OperationRepo.setDiscount(operationId, req);
		return Dto.success(operation);
	}

	static async setEstimation(operationId: number, req: SetOperationEstimationRequest): Promise<Dto<Operation | null>> {
		const operation: OperationEntity | null = await OperationRepo.setEstimation(operationId, req);
		return Dto.success(operation);
	}

	static async removeIssue(operationId: number, req: RemoveIssueRequest): Promise<Dto<Operation | null>> {
		const operation: Operation | null = await OperationRepo.removeIssue(operationId, req);
		return Dto.success(operation);
	}

	static async renameOperation(operationId: number, req: RenameOperationRequest): Promise<Dto<Operation | null>> {
		const operation: Operation | null = await OperationRepo.renameOperation(operationId, req);
		return Dto.success(operation);
	}

	static async deleteOperation(operationId: number): Promise<Dto<null>> {
		await OperationRepo.deleteOperation(operationId);
		return Dto.success(null);
	}
}
