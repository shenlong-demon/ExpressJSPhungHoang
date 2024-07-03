import {BaseEntity} from "./base_entity";

export type CustomerEntity = BaseEntity & {
    name: string;
    phone: string;
};
