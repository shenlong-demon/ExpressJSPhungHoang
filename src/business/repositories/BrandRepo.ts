import { BrandEntity } from './model';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';
import { CreateBrandRequest, UpdateBrandRequest } from '@business/model';

export class BrandRepo {
	static async getBrands(): Promise<BrandEntity[]> {
		const brands: BrandEntity[] = await prisma.phbrand.findMany();
		return brands;
	}

	static async createBrand(req: CreateBrandRequest): Promise<BrandEntity | null> {
		const brand: BrandEntity | null = await prisma.phbrand.create({
			data: {
				name: req.name,
				status: req.status,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		return brand;
	}

	static async updateBrand(brandId: number, req: UpdateBrandRequest): Promise<BrandEntity | null> {
		const brand: BrandEntity | null = await prisma.phbrand.update({
			where: {
				id: brandId,
			},
			data: {
				name: req.name,
				status: req.status,
				updatedAt: DateTimeUtils.now(),
			},
		});
		return brand;
	}
}
