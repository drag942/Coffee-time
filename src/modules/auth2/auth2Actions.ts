import {actionCreator} from "../../core/store";
import {IAuth2Params} from "../../types/interfaces";

export class Auth2Actions {
    static login = actionCreator.async<IAuth2Params, string, Error>("Auth2/LOGIN");
}