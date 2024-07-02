import {AuthService, SettingService, TokenService, Setting, User} from "../../services";
import {Dto, Logger} from "@core/common";
import {LoginRequest} from "@business/model/request";
import {LoginResult} from "@business/model/result";

export class LoginWithPhoneNumberAndPasswordFacade {
    static async login(req: LoginRequest): Promise<Dto<LoginResult | null>> {
        const verify: Dto<User | null> = await AuthService.login(req);
        Logger.log(() => [`LoginWithPhoneNumberAndPasswordFacade `, verify]);
        if (verify.next()) {
            const user: User = verify.data!;
            const token: string = await TokenService.getToken(user);
            user.token = token;
            await AuthService.setToken(user, token);
            Logger.log(() => [`LoginWithPhoneNumberAndPasswordFacade setToken`]);
            const setting: Setting = await SettingService.getSetting();

            return Dto.success({
                user,
                setting
            });
        }
        return verify.bypass();
    }
}
