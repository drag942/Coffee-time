import {ProductFullInfo} from "../../core/api/CoffeeRequest";
import {LoadState} from "../../common/loadState";

export interface ICoffeePageState {
    product: Map <string, ProductFullInfo>;
    loadState: LoadState;
    error: string | null;
}

export const CoffeeInitialState: ICoffeePageState = {
    product: new Map<string, ProductFullInfo>(),
    loadState: LoadState.needLoad,
    error: null,
};