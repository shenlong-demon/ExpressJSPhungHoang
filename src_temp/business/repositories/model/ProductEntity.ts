import {BaseEntity} from "./base_entity";
import {GroupEntity} from "./group_entity";
import {BrandEntity} from "./brand_entity";

export type ProductEntity = BaseEntity &  {
    code: string | null;
    name: string;
    otherName: string | null;
    image: string | null;
    price: number;
    basePrice: number;
    quantity: number;
    status: number;
    brandId: number;
    brand?: BrandEntity;
    groupId: number;
    group?: GroupEntity;
};
