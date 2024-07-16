import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/ProductEntity";
import {OperationEntity} from "@business/repositories/model/OperationEntity";

export type BookingEntity = BaseEntity & {
    product?: ProductEntity | null;
    productId?: number | null;
    name?: string | null;
    price: number;
    quantity: number;
    note?: string | null;
    operationId: number;
    operation?: OperationEntity | null;
    profit: number;
};
