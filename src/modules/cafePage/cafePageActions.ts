import {actionCreator} from "../../core/store";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {LoadState} from "../../common/loadState";

export class CafePageActions {
    static getProducts = actionCreator.async<ICafePageParams, ProductBriefInfo[], Error>("CAFEPAGE/GET_PRODUCTS");
}

export interface ICafePageParams {
    loadState: LoadState;
    id: string;
}
