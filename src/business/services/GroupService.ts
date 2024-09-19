import { Group } from './model';
import { GroupEntity } from '../repositories/model';
import { GroupRepo } from '../repositories';
import { Dto } from '../../core/common';
import { CreateBrandRequest, UpdateBrandRequest } from '@business/model';

export class GroupService {
	static async getGroups(): Promise<Dto<Group[]>> {
		const groups: Group[] = await GroupRepo.getGroups();
		return Dto.success(groups);
	}
	static async updateGroup(groupId: number, req: UpdateBrandRequest): Promise<Dto<Group | null>> {
		const group: GroupEntity | null = await GroupRepo.update(groupId, req);
		return Dto.success(group);
	}
	static async createGroup(req: CreateBrandRequest): Promise<Dto<Group | null>> {
		const group: GroupEntity | null = await GroupRepo.create(req);
		return Dto.success(group);
	}
}
