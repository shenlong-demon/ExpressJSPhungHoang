import { BrandEntity } from './model';
import { prisma } from '../../../prisma/PrismaClient';
import {DateTimeUtils} from "@business/common";

export class BrandRepo {
	static async update(id: number, name: string, status: number): Promise<BrandEntity | null> {
		const brand = await prisma.phbrand.update({
			where: {
				id,
				updatedAt: DateTimeUtils.now()
			},
			data: {
				name,
				status,
			},
		});
		return brand;
	}

	static async create(name: string, status: number): Promise<BrandEntity | null> {
		const brand: BrandEntity | null = await prisma.phbrand.create({
			data: {
				name,
				status,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now()
			},
		});
		return brand;
	}
	static async getBrands(): Promise<BrandEntity[]> {
		const brands: BrandEntity[] = await prisma.phbrand.findMany();
		return brands;
	}
}
