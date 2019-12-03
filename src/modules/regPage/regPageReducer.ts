import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {Failure} from "typescript-fsa";
import {IRegParams} from "../../types/interfaces";

import {IRegState, RegInitialState} from "./regPageState";
import {RegPageActions} from "./regPageActions";

function registrationStartedHandler(state: IRegState): IRegState {
    return newState(state, {isReg: true, error: null});
}

function registrationDoneHandler(state: IRegState): IRegState {
    return newState(state, {isReg: false, error: null});
}

function registrationFailedHandler(state: IRegState, failed: Failure<IRegParams, Error>): IRegState {
    return newState(state, {isReg: false, error: failed.error.message});
}

export const regPageReducer = reducerWithInitialState(RegInitialState)
    .case(RegPageActions.registration.started, registrationStartedHandler)
    .case(RegPageActions.registration.done, registrationDoneHandler)
    .case(RegPageActions.registration.failed, registrationFailedHandler)
;
