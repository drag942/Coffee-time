import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {LoadState} from "../../common/loadState";
import {ProductFullInfo} from "../../core/api/CoffeeRequest";
import {CoffeeInitialState, ICoffeePageState} from "./coffeePageState";
import {CoffeePageActions, ICoffeePageParams} from "./coffeePageActions";
import {IAppState} from "../../core/store/appState";
import {CoreActions} from "../../core/store";

function getProductStartedHandler(state: ICoffeePageState): ICoffeePageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getProductDoneHandler(state: ICoffeePageState, {result, params}: Success<ICoffeePageParams, ProductFullInfo>): ICoffeePageState {
    const product =  state.product;
    switch (params.loadState) {
        case LoadState.firstLoad:
            product.set(params.id, result);
            break;
        case LoadState.allIsLoaded:
        case LoadState.pullToRefresh:
            product.set(params.id, result);
            break;
        default:
            throw new Error(`LoadState ${params.loadState} is not valid in this context.`);
    }

    return newState(state, {loadState: LoadState.allIsLoaded, product});
}

function getProductFailedHandler(state: ICoffeePageState, failed: Failure<ICoffeePageParams, Error>): ICoffeePageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function rehydrateHandler(state: ICoffeePageState, rehydratedState: IAppState): ICoffeePageState {
    const nState = rehydratedState.coffeePage || state;

    return newState(nState, {loadState: LoadState.needLoad, product: rehydratedState.coffeePage.product});
}

export const coffeePageReducer = reducerWithInitialState(CoffeeInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(CoffeePageActions.getProduct.started, getProductStartedHandler)
    .case(CoffeePageActions.getProduct.done, getProductDoneHandler)
    .case(CoffeePageActions.getProduct.failed, getProductFailedHandler)
;