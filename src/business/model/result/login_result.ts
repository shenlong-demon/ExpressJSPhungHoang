import {Setting, User} from "@business/services";

export type LoginResult = {
    user: User;
    setting: Setting;
}
