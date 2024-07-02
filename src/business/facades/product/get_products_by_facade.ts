import {ProductService, Product} from "@business/services";
import {Dto} from "@core/common";
import {ProductFilterRequest} from "@business/model/request";

export class GetProductsByFacade {
    static async get(filter: ProductFilterRequest): Promise<Dto<Product[]>> {
        const dto: Dto<Product[]> = await ProductService.getProductsBy(filter);
        return dto;
    }
}
