import {LoadState} from "../../common/loadState";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";

export interface ICafePageState {
    products: ProductBriefInfo[];
    loadState: LoadState;
    error: string | null;
}

export const CafeInitialState: ICafePageState = {
    products: [],
    loadState: LoadState.needLoad,
    error: null,
};