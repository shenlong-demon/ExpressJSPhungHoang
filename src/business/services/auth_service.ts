import {UserRepo} from "../repositories";
import {UserEntity} from "../repositories/model";
import {User} from "./model";
import {ERROR_CODE, STATUS} from "@business/common";
import {Dto, Logger} from "@core/common";
import {LoginRequest} from "@business/model/request";

export class AuthService {
    static async login(req: LoginRequest): Promise<Dto<User | null>> {
        const user: UserEntity | null = await UserRepo.getByPhoneAndPassword(req);
        Logger.log(() => [`AuthService loginWithPhoneNumberAndPassword `, req, user]);
        if(!!user){
            if(user.status === STATUS.ACTIVE){
                return Dto.success(user);
            }
            return Dto.error(ERROR_CODE.USER_IS_INACTIVE);
        }
        return Dto.error(ERROR_CODE.USER_NOT_EXIST);
    }

    static async setToken(user: User, token: string): Promise<void> {
        await UserRepo.setToken(user.id, token);
    }
}
