import {Fto} from "../Fto";
import {Brand, BrandService, Dto} from "../../services";

export class GetBrandsFacade {
    static async getBrands(): Promise<Fto<Brand[]>> {
        const dto: Dto<Brand[]> = await BrandService.getBrands();
        return Fto.from(dto);
    }
}
