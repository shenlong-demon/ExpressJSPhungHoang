import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/CustomerEntity";
import {BookingEntity} from "@business/repositories/model/BookingEntity";
import {EmployeeEntity} from "@business/repositories/model/employee_entity";
import {OperationIssueEntity} from "@business/repositories/model/OperationIssueEntity";

export type OperationEntity = BaseEntity & {
    name: string | null;
    phone: string | null;
    note: string | null;
    discount: number;
    customerId: number | null;
    customer: CustomerEntity | null;
    employee: EmployeeEntity | null;
    employeeId: number | null;
    bookings: BookingEntity[];
    issues: OperationIssueEntity[];
    estimation: number | null;
};
