import {Fto} from "../Fto";
import {Brand, BrandService, Dto, Group, GroupService} from "../../services";

export class GetGroupsFacade {
    static async getGroups(): Promise<Fto<Brand[]>> {
        const dto: Dto<Group[]> = await GroupService.getGroups();
        return Fto.from(dto);
    }
}
