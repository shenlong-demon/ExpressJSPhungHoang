import {Product} from "./model/product";
import {Dto} from "./dto";
import {ProductRepo} from "../repositories";
import {ProductEntity} from "../repositories/model";

export class ProductService {
    static async createNewProduct(code: string, name: string, otherName: string, groupId: number, brandId: number, price: number,quantity: number, image: string) : Promise<Dto<Product | null>>{
        const newProduct : ProductEntity | null = await ProductRepo.createNewProduct(code, name, otherName, groupId, brandId, price, quantity, image);
        return Dto.success(newProduct);
    }
    static async getProducts(status: number, offset: number) : Promise<Dto<Product[]>>{
        const newProduct : ProductEntity[] = await ProductRepo.getProducts(status, offset);
        return Dto.success(newProduct);
    }
}