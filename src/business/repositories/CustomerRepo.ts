import {CustomerEntity} from "./model";

import {PrismaClient} from '@prisma/client'
import {CreateCustomerRequest, FilterCustomerRequest, UpdateCustomerRequest} from "../model/request";
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";

const prisma = new PrismaClient();

export class CustomerRepo {
    // static async getCustomer(req: FilterCustomerRequest): Promise<CustomerEntity[]> {
    //     Logger.log(() => [`ProductRepo getProducts ${status} ${offset}`]);
    //     const objs: any[] = await prisma.phcustomer.findMany({
    //         where:  {
    //
    //         },
    //
    //         skip: req.offset * DB_CONSTANT.PAGING,
    //         take: DB_CONSTANT.PAGING
    //
    //     });
    //     return objs;
    // };
    static async createCustomer(req: CreateCustomerRequest): Promise<CustomerEntity | null> {
        const obj: any | null = await prisma.phcustomer.create({
            data: {
                name: req.name,
                nickName: req.nickName || CONSTANT.STR_EMPTY,
                phone: req.phone,
                image: req.image || CONSTANT.STR_EMPTY,
                status: req.status
            }
        });
        return obj;
    }
    static async updateCustomer(id: number, req: UpdateCustomerRequest): Promise<CustomerEntity | null> {
        const obj: any | null = await prisma.phcustomer.update({
            where: {
                id
            },data: {
                name: req.name,
                nickName: req.nickName,
                phone: req.phone,
                image: req.image,
                status: req.status
            }
        });
        return obj;
    }

}
