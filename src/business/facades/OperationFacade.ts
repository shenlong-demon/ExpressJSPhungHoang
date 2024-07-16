import {BookingRequest} from "@business/model";
import {Operation, OperationService, Product, ProductService} from "@business/services";
import {Dto} from "@core/common";

export class OperationFacade {
    static async booking(operationId: number, req: BookingRequest): Promise<Dto<Operation | null>> {
        const productDto: Dto<Product | null> = await ProductService.getProductById(req.productId);
        if (productDto.next()) {
            const product: Product = productDto.data as Product;

            const dto: Dto<Operation | null> = await OperationService.booking(operationId, product);
            return dto;
        } else {
            return productDto.bypass();
        }

    }

}
