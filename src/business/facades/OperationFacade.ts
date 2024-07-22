import {AssignCustomerRequest, BookingRequest, CreateOperationIssue, ReceiptRequest} from "@business/model";
import {Operation, OperationService, Product, ProductService} from "@business/services";
import {Dto} from "@core/common";

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

    static async receipt(operationId: number, req: ReceiptRequest) : Promise<Dto<Operation | null>> {
        const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
        if (dto.next()) {
            const op: Operation = dto.data as Operation;
            const assignDto: Dto<Operation | null> = await OperationService.prepareReceipt(operationId);
            return assignDto;
        }
        return dto.bypass();
    }

    static async createIssue(operationId: number, req: CreateOperationIssue) : Promise<Dto<Operation | null>> {
        const dto: Dto<Operation | null> = await OperationService.getOperation(operationId);
        if (dto.next()) {
            const op: Operation = dto.data as Operation;
            const assignDto: Dto<Operation | null> = await OperationService.createIssue(operationId, req);
            return assignDto;
        }
        return dto.bypass();
    }
}
