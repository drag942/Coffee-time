import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {Failure} from "typescript-fsa";
import {IAuthParams} from "../../types/interfaces";
import {AuthActions} from "./authActions";
import {IAppState} from "../../core/store/appState";
import {CoreActions} from "../../core/store";
import {AuthInitialState, IAuthState} from "./authState";

function loginStartedHandler(state: IAuthState): IAuthState {
    return newState(state, {isAuthorizing: true, error: null});
}

function loginDoneHandler(state: IAuthState): IAuthState {
    return newState(state, {isAuthorizing: false, error: null});
}

function loginFailedHandler(state: IAuthState, failed: Failure<IAuthParams, Error>): IAuthState {
    return newState(state, {isAuthorizing: false, error: failed.error.message});
}

function rehydrateHandler(state: IAuthState , rehydratedState: IAppState): IAuthState {
    const nState = rehydratedState.auth || state;

    return newState(nState, {isAuthorizing: false, error: null});
}

export const authReducer = reducerWithInitialState(AuthInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(AuthActions.login.started, loginStartedHandler)
    .case(AuthActions.login.done, loginDoneHandler)
    .case(AuthActions.login.failed, loginFailedHandler)
;
