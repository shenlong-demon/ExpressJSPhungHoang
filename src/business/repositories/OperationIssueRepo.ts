import { OperationIssueEntity } from './model';
import { CreateOperationIssue } from '@business/model';

import { prisma } from '../../../prisma/PrismaClient';
import {DateTimeUtils} from "@business/common";

export class OperationIssueRepo {
	static async createIssue(operationId: number, req: CreateOperationIssue): Promise<OperationIssueEntity> {
		const issue = await prisma.phoperationissue.create({
			data: {
				operationId,
				appKey: req.appKey,
				note: req.note,
				image: req.image,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			}
		});
		return issue as OperationIssueEntity;
	}
}
