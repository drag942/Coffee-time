import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {LoadState} from "../../common/loadState";
import {IMainPageState, MainPageInitialState} from "./mainPageState";
import {MainPageActions} from "./mainPageActions";
import {CafeInfo} from "../../core/api/CoffeeRequest";

function getCafesStartedHandler(state: IMainPageState): IMainPageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getCafesDoneHandler(state: IMainPageState, {result}: Success<IEmpty, CafeInfo[]>): IMainPageState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: null, cafes: result});
}

function getCafesFailedHandler(state: IMainPageState, failed: Failure<IAuth2Params, Error>): IMainPageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const mainPageReducer = reducerWithInitialState(MainPageInitialState)
    .case(MainPageActions.getCafes.started, getCafesStartedHandler)
    .case(MainPageActions.getCafes.done, getCafesDoneHandler)
    .case(MainPageActions.getCafes.failed, getCafesFailedHandler)
;