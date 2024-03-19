import {Fto} from "../Fto";
import {Dto, Group, GroupService} from "../../services";

export class UpdateGroupFacade {
    static async update(id: number, name: string, status: number): Promise<Fto<Group | null>> {
        const dto: Dto<Group | null> = await GroupService.updateGroup(id, name, status);
        return Fto.from(dto);
    }
}