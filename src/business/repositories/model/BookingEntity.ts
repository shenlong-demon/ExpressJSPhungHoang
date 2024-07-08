import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/product_entity";
import {OperationEntity} from "@business/repositories/model/OperationEntity";

export type BookingEntity = BaseEntity & {
    product?: ProductEntity | null;
    productId?: number | null;
    price: number;
    quantity: number;
    note: string | null;
    operation: OperationEntity;
    operationId: number;
};
