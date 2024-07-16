import {OperationEntity} from "./model";
import {PrismaClient} from '@prisma/client'
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";

const prisma = new PrismaClient();
export class OperationRepo {

    static async create(name?: string): Promise<OperationEntity | null> {
        const operation: OperationEntity = await prisma.phoperation.create({
            data: {
                name: name || CONSTANT.STR_EMPTY
            }
        });
        return operation;
    }

    static async getOperations(offset: number) {
        Logger.log(() => [`OperationRepo getOperations ${offset}`]);
        const products: any[] = await prisma.phoperation.findMany({
            orderBy: [
                {
                    updatedAt: 'desc',
                }
            ],
            skip: offset * DB_CONSTANT.PAGING,
            take: DB_CONSTANT.PAGING
        });
        return products;
    }

    static async getOperation(id: number): Promise<OperationEntity | null> {
        Logger.log(() => [`OperationRepo getOperation ${id}`]);
        const op: OperationEntity | null = await prisma.phoperation.findFirst({
            where: {
                id
            },
            include: {
                employee: true,
                customer: true,
                bookings: {
                    include: {
                        product: {
                            include: {
                                brand: false,
                                group: false
                            }
                        }
                    }
                }
            },
        })
        return op;
    }
}
