import { Product, ProductService } from '../../services';
import { UpdateProductRequest } from '@business/model';
import { Dto } from '@core/common';

export class UpdateProductFacade {
	static async update(id: number, req: UpdateProductRequest): Promise<Dto<Product | null>> {
		const dto: Dto<any | null> = await ProductService.updateProduct(id, req);
		return dto;
	}
}
