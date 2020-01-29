import {actionCreator} from "../../core/store";
import { ProductFullInfo} from "../../core/api/CoffeeRequest";
import {LoadState} from "../../common/loadState";

export class CoffeePageActions {
    static getProduct = actionCreator.async<ICoffeePageParams, ProductFullInfo | null, Error>("CoffeePage/GET_PRODUCT");
    static setFavorite = actionCreator.async<IEmpty, boolean | null, Error>("CoffeePage/SET_FAVORITE");
    static unsetFavorite = actionCreator.async<IEmpty, boolean | null, Error>("CoffeePage/UNSET_FAVORITE");
}

export interface ICoffeePageParams {
    loadState: LoadState;
    id: string;
}