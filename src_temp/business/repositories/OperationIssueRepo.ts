import {OperationEntity, OperationIssueEntity} from "./model";
import {PrismaClient} from '@prisma/client'
import {CONSTANT, DB_CONSTANT, Logger} from "@core/common";
import {AssignCustomerRequest, CreateOperationIssue} from "@business/model";

const prisma = new PrismaClient();
export class OperationIssueRepo {

    static async createIssue(operationId: number, req: CreateOperationIssue): Promise<OperationIssueEntity> {
        const issue = await prisma.phoperationissue.create({
            data: {
                operationId,
                appKey: req.appKey,
                note: req.note,
                image: req.image
            },
            include: {
                operation: {
                    include: {
                        bookings: {
                            include: {
                                product: true
                            }
                        },
                        issues: true
                    }
                }
            }
        });
        return issue as OperationIssueEntity;
    }
}
