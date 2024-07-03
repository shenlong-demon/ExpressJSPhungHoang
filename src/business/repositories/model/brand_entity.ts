import {BaseEntity} from "./base_entity";

export type BrandEntity = BaseEntity & {
    name: string;
    status: number;
};
