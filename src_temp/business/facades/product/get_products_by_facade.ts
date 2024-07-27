import {ProductService, Product} from "../../services";
import {Dto} from "../../../core/common";
import {ProductFilterRequest} from "../../model/request";

export class GetProductsByFacade {
    static async get(filter: ProductFilterRequest): Promise<Dto<Product[]>> {
        const dto: Dto<Product[]> = await ProductService.getProductsBy(filter);
        return dto;
    }
}
