import {Dto} from "@core/common";
import {OperationRepo} from "@business/repositories";
import {Operation} from "@business/services/model";
import {OperationEntity} from "@business/repositories/model";

export class OperationService {
    static async createOperation(name?: string) : Promise<Dto<Operation | null>>{
        const newOperation : OperationEntity | null = await OperationRepo.create(name);
        return Dto.success(newOperation);
    }

    static async getOperations(offset: number) : Promise<Dto<Operation[]>>{
        const operations: OperationEntity[] = await OperationRepo.getOperations(offset);
        return Dto.success(operations);
    }
}
