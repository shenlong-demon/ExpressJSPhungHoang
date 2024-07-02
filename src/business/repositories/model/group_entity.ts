import {BaseEntity} from "./base_entity";

export type GroupEntity = BaseEntity &  {
    id: number;
    name: string;
    status: number;
};
