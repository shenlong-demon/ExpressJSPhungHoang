import { GroupEntity } from './model';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';
import { CreateGroupRequest, UpdateGroupRequest } from '@business/model';

export class GroupRepo {
	static async update(id: number, req: UpdateGroupRequest): Promise<GroupEntity | null> {
		const group: GroupEntity | null = await prisma.phgroup.update({
			where: {
				id,
			},
			data: {
				name: req.name,
				status: req.status,
				updatedAt: DateTimeUtils.now(),
			},
		});
		return group;
	}

	static async create(req: CreateGroupRequest): Promise<GroupEntity | null> {
		const group: GroupEntity | null = await prisma.phgroup.create({
			data: {
				name: req.name,
				status: req.status,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		return group;
	}

	static async getGroups(): Promise<GroupEntity[]> {
		const groups: GroupEntity[] = await prisma.phgroup.findMany();
		return groups;
	}
}
