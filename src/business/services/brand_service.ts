import {Brand} from "./model";
import {BrandEntity} from "../repositories/model";
import {BrandRepo} from "../repositories";
import {Dto} from "@core/common";

export class BrandService {

    static async getBrands() : Promise<Dto<Brand[]>> {
        const brands: Brand[] = await BrandRepo.getBrands()
        return Dto.success(brands);
    }
    static async updateBrand(id: number, name: string, status: number) : Promise<Dto<Brand | null>> {
        let brandEntity: BrandEntity | null = null;
        if(id > 0){
            brandEntity = await BrandRepo.update(id, name, status);
        }
        else {
            brandEntity = await BrandRepo.create(name, status);
        }
        const brand: Brand | null = !!brandEntity ? {...brandEntity} : null;

        return Dto.success(brand);
    }
}
