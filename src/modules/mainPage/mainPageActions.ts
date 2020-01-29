import {actionCreator} from "../../core/store";
import {CafeInfo} from "../../core/api/CoffeeRequest";

export class MainPageActions {
    static getCafes = actionCreator.async<IEmpty, CafeInfo[], Error>("MainPage/GET_CAFES");
}