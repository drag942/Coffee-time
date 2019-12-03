import {actionCreator} from "../../core/store";
import {IRegParams} from "../../types/interfaces";

export class RegPageActions {
    static registration = actionCreator.async<IRegParams, string, Error>("RegPage/REGISTRATION");
}