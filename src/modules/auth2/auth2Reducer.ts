import {reducerWithInitialState} from "typescript-fsa-reducers";
import {AuthInitialState2, IAuthState2} from "./authState2";
import {newState} from "../../common/newState";
import {Failure} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {Auth2Actions} from "./auth2Actions";

function loginStartedHandler(state: IAuthState2): IAuthState2 {
    return newState(state, {isAuthorizing: true, error: null});
}

function loginDoneHandler(state: IAuthState2): IAuthState2 {
    return newState(state, {isAuthorizing: false, error: null});
}

function loginFailedHandler(state: IAuthState2, failed: Failure<IAuth2Params, Error>): IAuthState2 {
    return newState(state, {isAuthorizing: false, error: failed.error.message});
}

export const auth2Reducer = reducerWithInitialState(AuthInitialState2)
    .case(Auth2Actions.login.started, loginStartedHandler)
    .case(Auth2Actions.login.done, loginDoneHandler)
    .case(Auth2Actions.login.failed, loginFailedHandler)
;
