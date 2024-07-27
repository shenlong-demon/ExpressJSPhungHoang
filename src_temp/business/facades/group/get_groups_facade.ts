import {Group, GroupService} from "../../services";
import {Dto} from "../../../core/common";

export class GetGroupsFacade {
    static async getGroups(): Promise<Dto<Group[]>> {
        const dto: Dto<Group[]> = await GroupService.getGroups();
        return dto;
    }
}
