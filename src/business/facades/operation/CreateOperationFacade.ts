import {Dto} from "../../../core/common";
import {Operation} from "@business//services";
import {OperationService} from "@business/services";

export class CreateOperationFacade {
    static async create(name?: string): Promise<Dto<Operation | null>> {
        const dto: Dto<Operation | null> = await OperationService.createOperation(name);
        return dto;
    }
}
