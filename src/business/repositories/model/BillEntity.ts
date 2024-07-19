import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/customer_entity";
import {OrderEntity} from "@business/repositories/model/OrderEntity";
import {EmployeeEntity} from "@business/repositories/model/employee_entity";

export type BillEntity = BaseEntity & {
    operationId: number;
    name: string | null;
    phone: string | null;
    note: string | null;
    estimation: Date | null;
    customer: CustomerEntity | null;
    customerId: number | null;
    employee: EmployeeEntity | null;
    employeeId: number | null;
    orders: OrderEntity[];
    profit: number;
    total: number;
};
