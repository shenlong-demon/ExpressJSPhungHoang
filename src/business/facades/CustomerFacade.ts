import {CreateCustomerRequest, UpdateCustomerRequest} from "@business/model";
import {CustomerService} from "@business/services/CustomerService";
import {Customer} from "@business/services";
import {Dto} from "@core/common";

export class CustomerFacade {
    static async createCustomer(req: CreateCustomerRequest): Promise<Dto<Customer | null>> {
        const dto: Dto<any | null> = await CustomerService.createCustomer(req);
        return dto;
    }
    static async updateCustomer(id: number, req: UpdateCustomerRequest): Promise<Dto<Customer | null>> {
        const dto: Dto<any | null> = await CustomerService.updateCustomer(id, req);
        return dto;
    }
}
