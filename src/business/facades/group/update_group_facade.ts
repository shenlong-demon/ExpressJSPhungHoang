import {Group, GroupService} from "../../services";
import {Dto} from "../../../core/common";

export class UpdateGroupFacade {
    static async update(id: number, name: string, status: number): Promise<Dto<Group | null>> {
        const dto: Dto<Group | null> = await GroupService.updateGroup(id, name, status);
        return dto;
    }
}
