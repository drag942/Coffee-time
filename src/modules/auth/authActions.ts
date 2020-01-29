import {actionCreator} from "../../core/store";
import {IAuth2Params} from "../../types/interfaces";

export class AuthActions {
    static login = actionCreator.async<IAuth2Params, string, Error>("Auth/LOGIN");
}