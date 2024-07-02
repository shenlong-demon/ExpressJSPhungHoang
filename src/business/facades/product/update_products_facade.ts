import {Product, ProductService} from "@business/services";
import {UpdateProductRequest} from "@business/model/request";

export class UpdateProductFacade {
    static async update(id: string, req: UpdateProductRequest): Promise<Dto<Product | null>> {
        const dto: Dto<any | null> = await ProductService.updateProduct(id, req);
        return dto;
    }
}
