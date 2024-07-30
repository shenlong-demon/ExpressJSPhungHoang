import {BaseEntity} from "./base_entity";

export type GroupEntity = BaseEntity &  {
    name: string;
    status: number;
};
