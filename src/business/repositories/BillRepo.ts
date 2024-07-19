import {BillEntity, OperationEntity} from "./model";
import {PrismaClient} from '@prisma/client'
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";
import {AssignCustomerRequest} from "@business/model";
import {Utils} from "@business/common";

const prisma = new PrismaClient();
export class BillRepo {
    static async getBill(id: number): Promise<BillEntity | null> {
        Logger.log(() => [`BillRepo getBill ${id}`]);
        const op = await prisma.phbill.findFirst({
            where: {
                id
            },
            include: {
                employee: true,
                customer: true,
                orders: {
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
        Logger.log(() => [`BillRepo getBill ${id} RESULT`, op]);

        return op as (BillEntity | null);
    }
    static async create(bill: BillEntity): Promise<BillEntity | null> {
        try {
            const final: BillEntity | null = await prisma.$transaction(async (prisma) => {
                const {id, customer, employee, orders, ...newBill} = {
                    ...bill,
                };
                // Update the total of the Operation
                const finalBill = await prisma.phbill.create({
                    data: newBill
                });
                // // Update the totals of each Booking
                for (const order of bill.orders || []) {
                    const {id, product, ...newOrder} = {
                        ...order,
                        billId: finalBill.id,
                        name: order.name,
                        note: order.note,

                    };
                    await prisma.phorder.create({
                        data: newOrder,
                    });
                }
                return BillRepo.getBill(finalBill.id);
            });
            Logger.log(() => [`BillRepo create RESULT`, final]);
            return final;

        }
        catch (e) {
            Logger.log(() => [`BillRepo create ERROR`, e]);

        }
        return null;
    }

}
