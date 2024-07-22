import {BaseEntity} from "./base_entity";

export type CustomerEntity = BaseEntity & {
    name: string;
    nickName: string;
    phone: string;
    total: number;
};
