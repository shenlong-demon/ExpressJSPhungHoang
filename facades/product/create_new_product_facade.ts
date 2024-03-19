import {Product} from "../../services/model/product";
import {Fto} from "../Fto";
import {Dto, ProductService} from "../../services";

export class CreateNewProductFacade {
    static async create(code: string, name: string, otherName: string, groupId: number, brandId: number, price: number,quantity: number, image: string): Promise<Fto<Product | null>> {
        const add : Dto<Product | null> = await ProductService.createNewProduct(code, name, otherName, groupId, brandId, price,quantity, image);
        return Fto.from(add);
    }
}