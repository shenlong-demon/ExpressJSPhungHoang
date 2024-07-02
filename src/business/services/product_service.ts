import {Product} from "./model/product";
import {ProductRepo} from "../repositories";
import {ProductEntity} from "../repositories/model";
import {Dto} from "@core/common";
import {CreateProductRequest, ProductFilterRequest, UpdateProductRequest} from "@business/model/request";

export class ProductService {
    static async createNewProduct(product: CreateProductRequest) : Promise<Dto<Product | null>>{
        const newProduct : ProductEntity | null = await ProductRepo.createNewProduct(product);
        return Dto.success(newProduct);
    }
    static async updateProduct(id: number, req: UpdateProductRequest) : Promise<Dto<Product | null>>{
        const newProduct : ProductEntity | null = await ProductRepo.updateProduct(id, req);
        return Dto.success(newProduct);
    }
    static async getProducts(status: number, offset: number) : Promise<Dto<Product[]>>{
        const newProduct : ProductEntity[] = await ProductRepo.getProducts(status, offset);
        return Dto.success(newProduct);
    }
    static async getProductsBy(req: ProductFilterRequest) : Promise<Dto<Product[]>>{
        const newProduct : ProductEntity[] = await ProductRepo.getProductsBy(req);
        return Dto.success(newProduct);
    }
}
