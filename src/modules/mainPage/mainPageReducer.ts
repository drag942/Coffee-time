import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {LoadState} from "../../common/loadState";
import {IMainPageState, MainPageInitialState} from "./mainPageState";
import {MainPageActions} from "./mainPageActions";
import {CafeInfo} from "../../core/api/CoffeeRequest";

import {IAppState} from "../../core/store/appState";
import {CoreActions} from "../../core/store";

function getCafesStartedHandler(state: IMainPageState): IMainPageState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getCafesDoneHandler(state: IMainPageState, {result}: Success<IEmpty, CafeInfo[]>): IMainPageState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: null, cafes: result});
}

function getCafesFailedHandler(state: IMainPageState, failed: Failure<IAuth2Params, Error>): IMainPageState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function rehydradeHandler(state: IMainPageState, rehydratedState: IAppState ): IMainPageState {
    return newState(rehydratedState.mainPage || state, {loadState: LoadState.needLoad, cafes: rehydratedState.mainPage.cafes});
}

export const mainPageReducer = reducerWithInitialState(MainPageInitialState)
    .case(CoreActions.rehydrate, rehydradeHandler)
    .case(MainPageActions.getCafes.started, getCafesStartedHandler)
    .case(MainPageActions.getCafes.done, getCafesDoneHandler)
    .case(MainPageActions.getCafes.failed, getCafesFailedHandler)
;