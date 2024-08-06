import { CustomerEntity } from './model';
import { CreateCustomerRequest, FilterCustomerRequest, UpdateCustomerRequest } from '@business/model';
import { CONSTANT, DB_CONSTANT } from '@core/common';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

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
				status: req.status,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		return obj;
	}

	static async updateCustomer(id: number, req: UpdateCustomerRequest): Promise<CustomerEntity | null> {
		const obj: any | null = await prisma.phcustomer.update({
			where: {
				id,
			},
			data: {
				name: req.name,
				nickName: req.nickName,
				phone: req.phone,
				image: req.image,
				status: req.status,
				updatedAt: DateTimeUtils.now(),
			},
		});
		return obj;
	}

	static async updateTotal(customerId: number, moreTotal: number): Promise<void> {
		const obj: any | null = await prisma.phcustomer.update({
			where: {
				id: customerId,
			},
			data: {
				total: {
					increment: moreTotal,
				},
				updatedAt: DateTimeUtils.now(),
			},
		});
	}

	static async searchCustomers(req: FilterCustomerRequest): Promise<CustomerEntity[]> {
		const obj: CustomerEntity[] = await prisma.phcustomer.findMany({
			where: {
				AND: [
					{
						status: req.status !== null ? req.status : undefined,
					},
					{
						OR: [
							{
								name: {
									contains: req.searchText,
									// mode: 'insensitive',  // TODO check case insensitive
								},
							},
							{
								nickName: {
									contains: req.searchText,
									// mode: 'insensitive',  // TODO check case insensitive
								},
							},
							{
								phone: {
									contains: req.searchText,
								},
							},
						],
					},
				],
			},
			skip: req.offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
		});
		return obj;
	}
}
