import {Product} from "./model/product";
import {Dto} from "./dto";
import {ProductRepo} from "../repositories";
import {ProductEntity} from "../repositories/model";
import {ProductFilterRequestDto} from "./requests";
import {CreateProductRequest} from "../facades/requests";

export class ProductService {
    static async createNewProduct(product: CreateProductRequest) : Promise<Dto<Product | null>>{
        const newProduct : ProductEntity | null = await ProductRepo.createNewProduct(product);
        return Dto.success(newProduct);
    }
    static async getProducts(status: number, offset: number) : Promise<Dto<Product[]>>{
        const newProduct : ProductEntity[] = await ProductRepo.getProducts(status, offset);
        return Dto.success(newProduct);
    }
    static async getProductsBy(filter: ProductFilterRequestDto) : Promise<Dto<Product[]>>{
        const newProduct : ProductEntity[] = await ProductRepo.getProductsBy(filter.name, filter.brandId, filter.groupId, filter.status, filter.offset);
        return Dto.success(newProduct);
    }
}
