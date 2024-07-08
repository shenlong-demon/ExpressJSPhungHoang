import {Dto} from "@core/common";
import {OperationRepo} from "@business/repositories";
import {Operation} from "@business/services/model";
import {OperationEntity} from "@business/repositories/model";
import {ERROR_CODE} from "@business/common";

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
}
