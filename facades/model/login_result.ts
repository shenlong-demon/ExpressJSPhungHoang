import {Setting, User} from "../../services";

export type LoginResult = {
    user: User | null;
    setting:Setting | null;
}