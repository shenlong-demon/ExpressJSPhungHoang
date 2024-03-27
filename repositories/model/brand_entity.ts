import {BaseEntity} from "./base_entity";

export type BrandEntity = BaseEntity & {
    id: number;
    name: string;
    status: number;
};
