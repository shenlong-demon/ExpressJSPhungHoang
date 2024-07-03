import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/customer_entity";
import {OperationItemEntity} from "@business/repositories/model/operation_item_entity";

export type OperationEntity = BaseEntity & {
    name?: string;
    phone?: string;
    note?: string;
    customer?: CustomerEntity;
    customerId?: number;
    items: OperationItemEntity[]
};
