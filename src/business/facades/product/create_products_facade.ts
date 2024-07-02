
import {Dto} from "@core/common";
import {Product, ProductService} from "@business/services";
import {CreateProductRequest} from "@business/model/request";

export class CreateProductFacade {
    static async create(product: CreateProductRequest): Promise<Dto<Product | null>> {
        const dto: Dto<Product | null> = await ProductService.createNewProduct(product);
        return dto;
    }
}
