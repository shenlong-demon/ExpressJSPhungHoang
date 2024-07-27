import {Dto} from "../../../core/common";
import {Operation} from "@business//services";
import {OperationService} from "@business/services";

export class GetOperationDetailFacade {
    static async getOperation(id: number): Promise<Dto<Operation | null>> {
        const dto: Dto<Operation | null> = await OperationService.getOperation(id);
        return dto;
    }
}
