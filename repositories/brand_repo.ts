import {BrandEntity, GroupEntity} from "./model";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export class BrandRepo {

    static async update(id: number, name: string, status: number): Promise<BrandEntity | null> {
        const brand = await prisma.brands.update({
            where: {
                id
            },
            data: {
                name,
                status
            },
        })
        return brand;
    }

    static async create(name: string, status: number): Promise<BrandEntity | null> {
        const brand: BrandEntity | null = await prisma.brands.create({
            data: {
                name, status
            }
        });
        return brand;
    }
    static async getBrands(): Promise<BrandEntity[]> {
        const brands: BrandEntity[] = await prisma.brands.findMany();
        return brands;
    }
}
