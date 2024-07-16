import {Dto} from "@core/common";
import {BookingRepo, OperationRepo} from "@business/repositories";
import {Operation, Product} from "@business/services/model";
import {BookingEntity, OperationEntity} from "@business/repositories/model";
import {ERROR_CODE} from "@business/common";
import {BookingRequestSdo} from "@business/repositories/request";

export class OperationService {
    static async createOperation(name?: string) : Promise<Dto<Operation | null>>{
        const newOperation : OperationEntity | null = await OperationRepo.create(name);
        return Dto.success(newOperation);
    }

    static async getOperations(offset: number) : Promise<Dto<Operation[]>>{
        const operations: OperationEntity[] = await OperationRepo.getOperations(offset);
        return Dto.success(operations);
    }
    static async getOperation(id: number) : Promise<Dto<Operation | null>>{
        const operation: OperationEntity | null = await OperationRepo.getOperation(id);
        if(!!operation){
            return Dto.success(operation);
        }
        return Dto.error(ERROR_CODE.USER_NOT_EXIST);
    }

    static async booking(operationId: number, product: Product) : Promise<Dto<Operation | null>> {
        const booking: BookingEntity = await BookingRepo.booking(operationId, {
            productId: product.id,
            productName: product.name,
            price: product.price,
            basePrice: product.basePrice,
            quantity: 1
        } as BookingRequestSdo) ;
        return Dto.success(booking.operation);
    }
}
