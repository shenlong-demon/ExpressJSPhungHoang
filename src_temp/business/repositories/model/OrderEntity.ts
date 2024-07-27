import {BaseEntity} from "@business/repositories/model/base_entity";
import {ProductEntity} from "@business/repositories/model/ProductEntity";
import {BillEntity} from "@business/repositories/model/BillEntity";

export type OrderEntity = BaseEntity & {
    bookingId: number;
    name: string | null;
    price: number;
    basePrice: number;
    quantity: number;
    note: string | null;
    product: ProductEntity | null;
    productId: number | null;
    billId: number;
    total: number;
    profit: number;
};
