import {actionCreator} from "../../core/store";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {ICafePageParams} from "../../types/interfaces";

export class CafePageActions {
    static getProducts = actionCreator.async<ICafePageParams, ProductBriefInfo[], Error>("CafePage/GET_PRODUCTS");
}
