import {Dto} from "../../../core/common";
import {Brand, BrandService} from "../../services";

export class UpdateBrandFacade {
    static async update(id: number, name: string, status: number): Promise<Dto<Brand | null>> {
        const dto: Dto<Brand | null> = await BrandService.updateBrand(id, name, status);
        return dto;
    }
}
