import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/product_entity";
import {BillEntity} from "@business/repositories/model/BillEntity";

export type OrderEntity = BaseEntity & {
    product?: ProductEntity;
    productId?: number;
    price: number;
    quantity: number;
    note?: string;
    bill: BillEntity;
    billId: number;
};
