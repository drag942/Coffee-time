import {actionCreator} from "../../core/store";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {LoadState} from "../../common/loadState";

export class CafePageActions {
    static getProducts = actionCreator.async<ICafePageParams, ProductBriefInfo[], Error>("CafePage/GET_PRODUCTS");
}

//TODO: Почему не вынести это отдельно?
export interface ICafePageParams {
    loadState: LoadState;
    id: string;
}
