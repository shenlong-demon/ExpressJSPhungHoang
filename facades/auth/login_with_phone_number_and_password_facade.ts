import {Fto} from "../Fto";
import {AuthService, Dto, SettingService, TokenService, Setting, User} from "../../services";
import {LoginResult} from "../model";
import {Logger} from "../../common";

export class LoginWithPhoneNumberAndPasswordFacade {
    static async login(phone: string, password: string): Promise<Fto<LoginResult>> {
        const verify: Dto<User | null> = await AuthService.loginWithPhoneNumberAndPassword(phone, password);
        Logger.log(() => [`LoginWithPhoneNumberAndPasswordFacade `, verify]);
        if (verify.isSuccess(true)) {
            const user: User = verify.data!;
            const token: string = await TokenService.getToken(user);
            user.token = token;
            await AuthService.setToken(user, token);
            Logger.log(() => [`LoginWithPhoneNumberAndPasswordFacade setToken`]);
            const setting: Setting = await SettingService.getSetting();

            return Fto.success({
                user: verify.data || null,
                setting
            });
        }
        return Fto.from(verify);
    }
}