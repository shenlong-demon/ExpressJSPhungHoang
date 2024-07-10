import {Dto} from "@core/common";
import {CustomerRepo, OperationRepo, ProductRepo} from "@business/repositories";
import {Customer, Operation} from "@business/services/model";
import {CustomerEntity, OperationEntity, ProductEntity} from "@business/repositories/model";
import {ERROR_CODE} from "@business/common";
import {CreateCustomerRequest, FilterCustomerRequest, UpdateCustomerRequest} from "@business/model";

export class CustomerService {

    // static async getCustomers(req: FilterCustomerRequest): Promise<Customer[]> {
    //     const objs : CustomerEntity[] = await CustomerRepo.getCustomers(req);
    //     return Dto.success(objs);
    // }
    static async createCustomer(req: CreateCustomerRequest) : Promise<Dto<Customer | null>>{
        const obj : CustomerEntity | null = await CustomerRepo.createCustomer(req);
        return Dto.success(obj);
    }
    static async updateCustomer(id: number, req: UpdateCustomerRequest) : Promise<Dto<Customer | null>>{
        const obj : CustomerEntity | null = await CustomerRepo.updateCustomer(id, req);
        return Dto.success(obj);
    }
}
