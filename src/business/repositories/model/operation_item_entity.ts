import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/product_entity";
import {OperationEntity} from "@business/repositories/model/operation_entity";

export type OperationItemEntity = BaseEntity & {
    product: ProductEntity;
    productId: number;
    price: number;
    quantity: number;
    note?: string;
    operation: OperationEntity;
    operationId: number;
};
