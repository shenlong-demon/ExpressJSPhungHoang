import {BaseEntity} from "./base_entity";

export type ProductEntity = BaseEntity &  {
    id: number;
    name: string;
    otherName: string | null;
    groupId: number;
    brandId: number;
    image: string | null;
    price: number;
    status: number;

};
