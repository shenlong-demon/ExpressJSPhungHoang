import {BaseEntity} from "@business/repositories/model/base_entity";
import {OperationEntity} from "@business/repositories/model/OperationEntity";

export type OperationIssueEntity = BaseEntity & {
    note: string | null;
    image: string | null;
    operationId: number;
    operation: OperationEntity;
};
