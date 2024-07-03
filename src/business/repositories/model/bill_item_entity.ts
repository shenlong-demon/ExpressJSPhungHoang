import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/product_entity";
import {BillEntity} from "@business/repositories/model/bill_entity";

export type BillItemEntity = BaseEntity & {
    product: ProductEntity;
    productId: number;
    price: number;
    quantity: number;
    note?: string;
    operation: BillEntity;
    operationId: number;
};
