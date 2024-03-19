import {ProductEntity} from "./model";
import {DB_CONSTANT, Logger} from "../common";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export class ProductRepo {

    static async createNewProduct(code: string, name: string, otherName: string, groupId: number, brandId: number, price: number, quantity: number, image: string): Promise<ProductEntity | null> {
        const product: ProductEntity | null = await prisma.products.create({
            data: {
                code,
                name,
                otherName,
                groupId,
                brandId,
                price,
                quantity,
                image
            }
        });
        return product;
    }

    static async getProducts(status: number, offset: number): Promise<ProductEntity[]> {
        Logger.log(() => [`ProductRepo getProducts ${status} ${offset}`]);
        const products: ProductEntity[] = await prisma.products.findMany({
            where:  {
                status
            },
            skip: offset * DB_CONSTANT.PAGING,
            take: DB_CONSTANT.PAGING

        });
        return products;
    }

}