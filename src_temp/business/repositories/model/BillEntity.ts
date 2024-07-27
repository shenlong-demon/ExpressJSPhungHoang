import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/CustomerEntity";
import {OrderEntity} from "@business/repositories/model/OrderEntity";
import {EmployeeEntity} from "@business/repositories/model/employee_entity";
import {BillIssueEntity} from "@business/repositories/model/BillIssueEntity";

export type BillEntity = BaseEntity & {
    operationId: number;
    name: string | null;
    phone: string | null;
    note: string | null;
    discount: number;
    estimation: Date | null;
    customer: CustomerEntity | null;
    customerId: number | null;
    employee: EmployeeEntity | null;
    employeeId: number | null;
    orders: OrderEntity[];
    issues: BillIssueEntity[];
    profit: number;
    total: number;
};
