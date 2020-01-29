import {LoadState} from "../../common/loadState";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";

export interface ICafePageState {
    products: Map<string, ProductBriefInfo[]>;
    loadState: LoadState;
    error: string | null;
}

export const CafeInitialState: ICafePageState = {
    products: new Map<string, ProductBriefInfo[]>(),
    loadState: LoadState.needLoad,
    error: null,
};