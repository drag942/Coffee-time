import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {LoadState} from "../../common/loadState";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {CafeInitialState, ICafePageState} from "./cafePageState";
import {CafePageActions, ICafePageParams} from "./cafePageActions";
import {IAppState} from "../../core/store/appState";
import {CoreActions} from "../../core/store";

function getProductsStartedHandler(state: ICafePageState): ICafePageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getProductsDoneHandler(state: ICafePageState, {params, result}: Success<ICafePageParams, ProductBriefInfo[]>): ICafePageState {
    let products: Map<string, ProductBriefInfo[]>;
    console.log(params.loadState);
    switch (params.loadState) {
        case LoadState.firstLoad:
            products = new Map<string, ProductBriefInfo[]>();
            products.set(params.id, result);
            break;
        case LoadState.allIsLoaded:
            products = state.products;
            break;
        default:
            throw new Error(`LoadState ${params.loadState} is not valid in this context.`);
    }

    return newState(state, {loadState: LoadState.allIsLoaded, products});
}

function getProductsFailedHandler(state: ICafePageState, failed: Failure<ICafePageParams, Error>): ICafePageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function rehydrateHandler(state: ICafePageState, rehydratedState: IAppState): ICafePageState {
    const nState = rehydratedState.cafePage || state;

    return newState(nState, {loadState: LoadState.needLoad});
}

export const cafePageReducer = reducerWithInitialState(CafeInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(CafePageActions.getProducts.started, getProductsStartedHandler)
    .case(CafePageActions.getProducts.done, getProductsDoneHandler)
    .case(CafePageActions.getProducts.failed, getProductsFailedHandler)
;