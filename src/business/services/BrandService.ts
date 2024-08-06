import { Brand } from './model';
import { BrandEntity } from '../repositories/model';
import { BrandRepo } from '../repositories';
import { Dto } from '../../core/common';
import { CreateBrandRequest, UpdateBrandRequest } from '@business/model';

export class BrandService {
	static async getBrands(): Promise<Dto<Brand[]>> {
		const brands: Brand[] = await BrandRepo.getBrands();
		return Dto.success(brands);
	}
	static async updateBrand(brandID: number, req: UpdateBrandRequest): Promise<Dto<Brand | null>> {
		const brand: BrandEntity | null = await BrandRepo.updateBrand(brandID, req);
		return Dto.success(brand);
	}
	static async createBrand(req: CreateBrandRequest): Promise<Dto<Brand | null>> {
		const brand: BrandEntity | null = await BrandRepo.createBrand(req);
		return Dto.success(brand);
	}
}
