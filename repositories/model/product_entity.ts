import {BaseEntity} from "./base_entity";
import {GroupEntity} from "./group_entity";
import {BrandEntity} from "./brand_entity";

export type ProductEntity = BaseEntity &  {
    id: number;
    name: string;
    otherName: string | null;
    groupId: number;
    group: GroupEntity;
    brandId: number;
    brand: BrandEntity;
    image: string | null;
    price: number;
    status: number;

};
