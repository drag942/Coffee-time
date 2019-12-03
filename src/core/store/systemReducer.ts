import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {IAppState} from "./appState";
import {CoreActions} from "./coreActions";
import {INotificationInfo, SystemActions} from "./systemActions";
import {ISystemState, SystemInitialState} from "./systemState";
import {Success} from "typescript-fsa";
import {AuthActions} from "../../modules/auth/authActions";
import {IAuth2Params} from "../../types/interfaces";

function rehydrateHandler(state: ISystemState, rehydratedState: IAppState): ISystemState {
    return newState(rehydratedState.system || state, {});
}

function setTokenHandler(state: ISystemState, token: string): ISystemState {
    return newState(state, {authToken: token});
}

function loginDoneHandler(state: ISystemState, success: Success<IAuth2Params, string>): ISystemState {
    return newState(state, {authToken: success.result});
}
 function login2DoneHandler(state: ISystemState, {result}: Success<IAuth2Params, string>): ISystemState {
    return newState(state, {authToken: result});
 }

function setNotificationInfoHandler(state: ISystemState, notificationInfo: INotificationInfo | null): ISystemState {
    return newState(state, {notificationInfo});
}

export const systemReducer = reducerWithInitialState(SystemInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(AuthActions.login.done, loginDoneHandler)
    .case(SystemActions.setToken, setTokenHandler)
    .case(SystemActions.setNotificationInfo, setNotificationInfoHandler)
     .case(AuthActions.login.done, login2DoneHandler )
    .build();