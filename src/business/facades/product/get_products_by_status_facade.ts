import {Product, ProductService} from "../../services";
import {Dto} from "../../../core/common";

export class GetProductsByStatusFacade {
    static async get(status: number, offset: number): Promise<Dto<Product[]>> {
        const dto: Dto<Product[]> = await ProductService.getProducts(status, offset);
        return dto;
    }
}
