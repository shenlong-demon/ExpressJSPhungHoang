import {BaseEntity} from "./base_entity";

export type EmployeeEntity = BaseEntity & {
    name: string;
    phone: string;
    status: number;
};
