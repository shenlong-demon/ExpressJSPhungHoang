import {Brand, Group} from "./model";
import {GroupEntity} from "../repositories/model";
import {BrandRepo, GroupRepo} from "../repositories";
import {Dto} from "@core/common";

export class GroupService {

    static async getGroups() : Promise<Dto<Group[]>> {
        const groups: Group[] = await GroupRepo.getGroups()
        return Dto.success(groups);
    }
    static async updateGroup(id: number, name: string, status: number) : Promise<Dto<Group | null>> {
        let groupEntity: GroupEntity | null = null;
        if(id > 0){
            groupEntity = await GroupRepo.update(id, name, status);
        }
        else {
            groupEntity = await GroupRepo.create(name, status);
        }
        const group: Group | null = !!groupEntity ? {...groupEntity} : null;

        return Dto.success(group);
    }
}
