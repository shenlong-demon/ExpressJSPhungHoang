import {Fto} from "../Fto";
import {Product} from "../../services/model/product";
import {Dto, ProductService} from "../../services";

export class GetProductsByStatusFacade {
    static async get(status: number, offset: number): Promise<Fto<Product[]>> {
        const dto: Dto<Product[]> = await ProductService.getProducts(status, offset);
        return Fto.from(dto);
    }
}