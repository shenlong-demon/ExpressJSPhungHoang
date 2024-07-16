import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/ProductEntity";

export type BookingEntity = BaseEntity & {
    product?: ProductEntity | null;
    productId?: number | null;
    name?: string | null;
    price: number;
    quantity: number;
    note?: string | null;
    operationId: number;
    profit: number;
};
