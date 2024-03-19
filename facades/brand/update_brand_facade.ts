import {Fto} from "../Fto";
import {Brand, BrandService, Dto} from "../../services";

export class UpdateBrandFacade {
    static async update(id: number, name: string, status: number): Promise<Fto<Brand | null>> {
        const dto: Dto<Brand | null> = await BrandService.updateBrand(id, name, status);
        return Fto.from(dto);
    }
}