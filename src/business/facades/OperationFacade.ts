import {
	AddOperationServiceRequest,
	AssignCustomerRequest,
	BookingRequest,
	CreateOperationIssue,
	ReceiptRequest,
	SetBookingNoteRequest,
	SetOperationDiscountRequest,
	SetOperationEstimationRequest,
} from '@business/model';
import { Bill, Operation, OperationService, Product, ProductService } from '@business/services';
import { Dto } from '@core/common';
import { CancelBookingRequest } from '@business/model/request/CancelBookingRequest';

export class OperationFacade {
	static async booking(operationId: number, req: BookingRequest): Promise<Dto<Operation | null>> {
		const productDto: Dto<Product | null> = await ProductService.getProductById(req.productId);
		if (productDto.next()) {
			const product: Product = productDto.data as Product;

			const dto: Dto<Operation | null> = await OperationService.booking(operationId, product);
			return dto;
		} else {
			return productDto.bypass();
		}
	}

	static async assignCustomer(operationId: number, req: AssignCustomerRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.assignCustomer(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async receipt(operationId: number, req: ReceiptRequest): Promise<Dto<Bill | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Bill | null> = await OperationService.prepareReceipt(operationId);
			return assignDto;
		}
		return dto.bypass();
	}

	static async createIssue(operationId: number, req: CreateOperationIssue): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.createIssue(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async addService(operationId: number, req: AddOperationServiceRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.addService(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async cancelBooking(operationId: number, req: CancelBookingRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.cancelBooking(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async setBookingNote(operationId: number, req: SetBookingNoteRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.setBookingNote(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async setDiscount(operationId: number, req: SetOperationDiscountRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const assignDto: Dto<Operation | null> = await OperationService.setDiscount(operationId, req);
			return assignDto;
		}
		return dto.bypass();
	}

	static async setEstimation(operationId: number, req: SetOperationEstimationRequest) {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		if (dto.next()) {
			const op: Operation = dto.data as Operation;
			const newOp: Dto<Operation | null> = await OperationService.setEstimation(operationId, req);
			return newOp;
		}
		return dto.bypass();
	}

	static async getOperationDetail(operationId: number): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
		return dto;
	}
}
