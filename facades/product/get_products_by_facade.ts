import {Fto} from "../Fto";
import {Product} from "../../services/model/product";
import {Dto, ProductService} from "../../services";
import {ProductFilterRequest} from "../requests";

export class GetProductsByFacade {
    static async get(filter: ProductFilterRequest): Promise<Fto<any[]>> {
        const dto: Dto<any[]> = await ProductService.getProductsBy(filter);
        return Fto.from(dto);
    }
}
