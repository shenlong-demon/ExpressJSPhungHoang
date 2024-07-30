import {Brand, BrandService} from "../../services";
import {Dto} from "../../../core/common";

export class GetBrandsFacade {
    public static async getBrands(): Promise<Dto<Brand[]>> {
        const dto: Dto<Brand[]> = await BrandService.getBrands();
        return dto;
    }
}
