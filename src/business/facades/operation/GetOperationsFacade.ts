import {Dto} from "../../../core/common";
import {Operation} from "@business//services";
import {OperationService} from "@business/services";

export class GetOperationsFacade {
    static async getOperations(offset: number): Promise<Dto<Operation[]>> {
        const dto: Dto<Operation[]> = await OperationService.getOperations(offset);
        return dto;
    }
}
