import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/customer_entity";
import {OrderEntity} from "@business/repositories/model/OrderEntity";
import {EmployeeEntity} from "@business/repositories/model/employee_entity";

export type BillEntity = BaseEntity & {
    name?: string;
    phone?: string;
    note?: string;
    customer?: CustomerEntity;
    customerId?: number;
    employee?: EmployeeEntity;
    employeeId?: number;
    orders: OrderEntity[]
};
