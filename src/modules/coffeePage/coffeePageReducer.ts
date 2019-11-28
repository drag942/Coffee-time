import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {LoadState} from "../../common/loadState";
import {ProductFullInfo} from "../../core/api/CoffeeRequest";
import {CoffeeInitialState, ICoffeePageState} from "./coffeePageState";
import {CoffeePageActions} from "./coffeePageActions";

function getProductStartedHandler(state: ICoffeePageState): ICoffeePageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getProductDoneHandler(state: ICoffeePageState, {result}: Success<IEmpty, ProductFullInfo>): ICoffeePageState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: null, product: result});
}

function getProductFailedHandler(state: ICoffeePageState, failed: Failure<IAuth2Params, Error>): ICoffeePageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const coffeePageReducer = reducerWithInitialState(CoffeeInitialState)
    .case(CoffeePageActions.getProduct.started, getProductStartedHandler)
    .case(CoffeePageActions.getProduct.done, getProductDoneHandler)
    .case(CoffeePageActions.getProduct.failed, getProductFailedHandler)
;