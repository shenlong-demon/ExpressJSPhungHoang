import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/customer_entity";
import {BillItemEntity} from "@business/repositories/model/bill_item_entity";

export type BillEntity = BaseEntity & {
    name?: string;
    phone?: string;
    note?: string;
    customer?: CustomerEntity;
    customerId?: number;
    items: BillItemEntity[]
};
