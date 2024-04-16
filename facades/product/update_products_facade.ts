import {Fto} from "../Fto";
import {Dto, ProductService} from "../../services";
import {CreateProductRequest} from "../requests";
import {UpdateProductRequest} from "../requests/update_product_request";

export class UpdateProductFacade {
    static async update(id: string, product: UpdateProductRequest): Promise<Fto<any[]>> {
        const dto: Dto<any | null> = await ProductService.createNewProduct(product);
        return Fto.from(dto);
    }
}
