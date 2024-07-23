import {BookingEntity, OperationEntity, ProductEntity} from "./model";
import {PrismaClient} from '@prisma/client'
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";
import {BookingRequestSdo} from "@business/repositories/request";
import {AddOperationServiceRequest} from "@business/model";

const prisma = new PrismaClient();
export class BookingRepo {
    static async booking(operationId: number, req: BookingRequestSdo): Promise<BookingEntity> {
        Logger.log(() => [`BookingRepo booking ${operationId}`, req]);
        const quantity: number = req.quantity;
        const finalBooking  = await prisma.$transaction(async (prisma) => {

            await prisma.phproduct.update({
                where: { id: req.productId },
                data: {quantity: {increment: quantity * -1}}
            });

            const bookingItem = await prisma.phbooking.create({
                data: {
                    productId: req.productId,
                    operationId: operationId,
                    price: req.price,
                    quantity,
                    name: req.productName,
                    note: CONSTANT.STR_EMPTY,
                    // profit: (req.price - req.basePrice) * quantity
                },
                include: {
                    operation: {
                        include: {
                            bookings: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            });
            return bookingItem;


        });
        Logger.log(() => [`BookingRepo booking ${operationId} RESULT`, finalBooking]);

        return finalBooking as BookingEntity;
    }

    static async addService(operationId: number, req: AddOperationServiceRequest) : Promise<BookingEntity> {
        Logger.log(() => [`BookingRepo addService ${operationId}`, req]);

            const bookingItem = await prisma.phbooking.create({
                data: {
                    productId: null,
                    operationId: operationId,
                    price: req.price,
                    quantity: 1,
                    name: req.name,
                    note: CONSTANT.STR_EMPTY,
                },
                include: {
                    operation: {
                        include: {
                            bookings: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            });



        Logger.log(() => [`BookingRepo addService ${operationId} RESULT`, bookingItem]);

        return bookingItem as BookingEntity;
    }
}
