import {BaseEntity} from "@business/repositories/model/base_entity";

export type BillIssueEntity = BaseEntity & {
    operationIssueId: number;
    note : string | null;
    image: string | null;
    billId: number;
};


