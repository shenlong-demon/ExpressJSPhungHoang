import { CreateBrandRequest, CreateGroupRequest, DataResult, UpdateBrandRequest, UpdateGroupRequest } from '@business/model';
import { Brand, BrandService, Group, GroupService } from '@business/services';
import { Dto, Logger } from '@core/common';

export class DataFacade {
	static async getAll(): Promise<Dto<DataResult | null>> {
		const brands: Dto<Brand[]> = await BrandService.getBrands();
		const groups: Dto<Group[]> = await GroupService.getGroups();
		Logger.log(() => [`DataFacade getAll`, { brands, groups }]);
		return Dto.success({ brands: brands.data || [], groups: groups.data || [] });
	}
	static async createBrand(req: CreateBrandRequest): Promise<Dto<Brand | null>> {
		return BrandService.createBrand(req);
	}

	static async updateBrand(brandId: number, req: UpdateBrandRequest): Promise<Dto<Brand | null>> {
		return BrandService.updateBrand(brandId, req);
	}
	static async createGroup(req: CreateGroupRequest): Promise<Dto<Group | null>> {
		return GroupService.createGroup(req);
	}

	static async updateGroup(groupId: number, req: UpdateGroupRequest): Promise<Dto<Group | null>> {
		return GroupService.updateGroup(groupId, req);
	}
}
