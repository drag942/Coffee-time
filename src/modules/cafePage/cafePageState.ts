import {LoadState} from "../../common/loadState";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";

export interface ICafePageState {
    key: boolean;
    products: Map<string, ProductBriefInfo[]>;
    loadState: LoadState;
    error: string | null;
}

export const CafeInitialState: ICafePageState = {
    key: false,
    products: new Map<string, ProductBriefInfo[]>(),
    loadState: LoadState.needLoad,
    error: null,
};