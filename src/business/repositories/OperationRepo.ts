import {OperationEntity} from "./model";
import {PrismaClient} from '@prisma/client'
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";
import {AssignCustomerRequest} from "@business/model";

const prisma = new PrismaClient();
export class OperationRepo {

    static async create(name?: string): Promise<OperationEntity | null> {
        const operation = await prisma.phoperation.create({
            data: {
                name: name || CONSTANT.STR_EMPTY
            }
        });
        return operation as OperationEntity;
    }

    static async getOperations(offset: number) : Promise<OperationEntity[]>{
        Logger.log(() => [`OperationRepo getOperations ${offset}`]);
        const operation = await prisma.phoperation.findMany({
            orderBy: [
                {
                    updatedAt: 'desc',
                }
            ],
            skip: offset * DB_CONSTANT.PAGING,
            take: DB_CONSTANT.PAGING
        });
        return operation as OperationEntity[];
    }

    static async getOperation(id: number): Promise<OperationEntity | null> {
        Logger.log(() => [`OperationRepo getOperation ${id}`]);
        const op = await prisma.phoperation.findFirst({
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
        });
        Logger.log(() => [`OperationRepo getOperation ${id} RESULT`, op]);

        return op as OperationEntity;
    }


    static async assignCustomer(operationId: number, req: AssignCustomerRequest): Promise<OperationEntity | null> {
        Logger.log(() => [`OperationRepo assignCustomer ${operationId}`, req]);
        const op = await prisma.phoperation.update({
            where: {
                id: operationId
            },
            data: {
                customerId: req.customerId
            },
            include: {
                customer: true
            }

        })
        Logger.log(() => [`OperationRepo assignCustomer ${operationId} RESULT`, op]);

        return op as OperationEntity;
    }

    static async updateFinalOperation(operation: OperationEntity): Promise<OperationEntity | null> {
        Logger.log(() => [`OperationRepo updateFinalOperation `, operation]);

        const final: OperationEntity | null = await prisma.$transaction(async (prisma) => {
            // Update the total of the Operation
            // await prisma.phoperation.update({
            //     where: { id: operation.id },
            //     data: { profit: operation.profit },
            // });

            // Update the totals of each Booking
            // for (const booking of operation.bookings || []) {
            //     await prisma.phbooking.update({
            //         where: { id: booking.id },
            //         data: { profit: operation.profit},
            //     });
            // }
            return OperationRepo.getOperation(operation.id);
        });
        Logger.log(() => [`OperationRepo updateFinalOperation RESULT`, final]);

        return final;
    }
}
