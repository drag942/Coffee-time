import {actionCreator} from "../../core/store";
import { ProductFullInfo} from "../../core/api/CoffeeRequest";

export class CoffeePageActions {
    static getProduct = actionCreator.async<IEmpty, ProductFullInfo | null, Error>("COFFEEPAGE/GET_PRODUCT");
    static setFavorite = actionCreator.async<IEmpty, boolean | null, Error>("COFFEEPAGE/SET_FAVORITE");
    static unsetFavorite = actionCreator.async<IEmpty, boolean | null, Error>("COFFEEPAGE/UNSET_FAVORITE");
}