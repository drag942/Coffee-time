import {reducerWithInitialState} from "typescript-fsa-reducers";
import {AuthInitialState2, IAuthState2} from "./authState";
import {newState} from "../../common/newState";
import {Failure} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {AuthActions} from "./authActions";
import {IAppState} from "../../core/store/appState";
import {CoreActions} from "../../core/store";

function loginStartedHandler(state: IAuthState2): IAuthState2 {
    return newState(state, {isAuthorizing: true, error: null});
}

function loginDoneHandler(state: IAuthState2): IAuthState2 {
    return newState(state, {isAuthorizing: false, error: null});
}

function loginFailedHandler(state: IAuthState2, failed: Failure<IAuth2Params, Error>): IAuthState2 {
    return newState(state, {isAuthorizing: false, error: failed.error.message});
}

function rehydrateHandler(state: IAuthState2 , rehydratedState: IAppState): IAuthState2 {
    const nState = rehydratedState.auth2 || state;

    return newState(nState, {isAuthorizing: false, error: null});
}

export const authReducer = reducerWithInitialState(AuthInitialState2)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(AuthActions.login.started, loginStartedHandler)
    .case(AuthActions.login.done, loginDoneHandler)
    .case(AuthActions.login.failed, loginFailedHandler)
;
