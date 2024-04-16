import {Fto} from "../Fto";
import {Dto, ProductService} from "../../services";
import {CreateProductRequest} from "../requests";

export class CreateProductFacade {
    static async create(product: CreateProductRequest): Promise<Fto<any[]>> {
        const dto: Dto<any | null> = await ProductService.createNewProduct(product);
        return Fto.from(dto);
    }
}
