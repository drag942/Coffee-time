import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {LoadState} from "../../common/loadState";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {CafeInitialState, ICafePageState} from "./cafePageState";
import {CafePageActions} from "./cafePageActions";

function getProductsStartedHandler(state: ICafePageState): ICafePageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getProductsDoneHandler(state: ICafePageState, {result}: Success<IEmpty, ProductBriefInfo[]>): ICafePageState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: null, products: result});
}

function getProductsFailedHandler(state: ICafePageState, failed: Failure<IAuth2Params, Error>): ICafePageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const cafePageReducer = reducerWithInitialState(CafeInitialState)
    .case(CafePageActions.getProducts.started, getProductsStartedHandler)
    .case(CafePageActions.getProducts.done, getProductsDoneHandler)
    .case(CafePageActions.getProducts.failed, getProductsFailedHandler)
;