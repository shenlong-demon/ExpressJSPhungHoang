import { OperationIssueEntity } from './model';
import { CreateOperationIssue } from '@business/model';

import { prisma } from '../../../prisma/PrismaClient';

export class OperationIssueRepo {
	static async createIssue(operationId: number, req: CreateOperationIssue): Promise<OperationIssueEntity> {
		const issue = await prisma.phoperationissue.create({
			data: {
				operationId,
				appKey: req.appKey,
				note: req.note,
				image: req.image,
			},
			include: {
				operation: {
					include: {
						bookings: {
							include: {
								product: true,
							},
						},
						issues: true,
					},
				},
			},
		});
		return issue as OperationIssueEntity;
	}
}
