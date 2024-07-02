import {BaseEntity} from "./base_entity";

export type UserEntity = BaseEntity &  {
    id: number;
    name: string;
    phone: string;
    token: string | null;
    status: number;
}
