import {BaseEntity} from "@business/repositories/model/base_entity";
import {CustomerEntity} from "@business/repositories/model/customer_entity";
import {BookingEntity} from "@business/repositories/model/BookingEntity";
import {EmployeeEntity} from "@business/repositories/model/employee_entity";

export type OperationEntity = BaseEntity & {
    name: string | null;
    phone: string | null;
    note: string | null;
    customerId: number | null;
    customer?: CustomerEntity | null;
    employee?: EmployeeEntity | null;
    employeeId?: number | null;
    bookings?: BookingEntity[]
};
