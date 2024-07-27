import {DataResult} from "@business/model";
import {Brand, BrandService, Group, GroupService} from "@business/services";
import {Dto, Logger} from "@core/common";

export class DataFacade {
    static async getAll(): Promise<Dto<DataResult | null>> {
        const brands: Dto<Brand[]> = await BrandService.getBrands();
        const groups: Dto<Group[]> = await GroupService.getGroups();
        Logger.log(() => [`DataFacade getAll`, brands, groups]);
        return Dto.success({brands: brands.data || [], groups: groups.data || []});
    }
}
