import {Dto} from "./dto";
import {UserRepo} from "../repositories";
import {UserEntity} from "../repositories/model";
import {Logger, USER_STATUS} from "../common";
import {User} from "./model";

export class AuthService {
    static async loginWithPhoneNumberAndPassword(phone: string, password: string): Promise<Dto<User | null>> {
        const user: UserEntity | null = await UserRepo.getByPhoneAndPassword(phone, password);
        Logger.log(() => [`AuthService loginWithPhoneNumberAndPassword ${phone} ${password}`, user]);
        if(!!user && user.status === USER_STATUS.ACTIVE){
            return Dto.success(user);
        }
        return Dto.failed(`user_not_active`);
    }

    static async setToken(user: User, token: string): Promise<void> {
        await UserRepo.setToken(user.id, token);
    }
}
