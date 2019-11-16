import {combineReducers} from "redux";
import {entitiesReducer} from "../../modules/entities/entitiesReducer";
import {NavigationConfig} from "../../navigation/config";
import {IAppState, INavigationState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";
import {authReducer} from "../../modules/auth/authReducer";
import {plannedRunReducer} from "../../modules/plannedRuns/plannedRunReducer";
import {currentRunReducer} from "../../modules/currentRun/currentRunReducer";
import {auth2Reducer} from "../../modules/auth2/auth2Reducer";
import {feedReducer} from "../../modules/feed/feedReducer";
import {mainPageReducer} from "../../modules/mainPage/mainPageReducer";

export function createMainReducer(): any {
    const navigationReducers: Reducers<INavigationState> = NavigationConfig.instance.getReducer();

    const reducers: Reducers<IAppState> = {
        navigation: combineReducers(navigationReducers),
        system: systemReducer,
        entities: entitiesReducer,
        auth: authReducer,
        plannedRuns: plannedRunReducer,
        currentRun: currentRunReducer,
        auth2: auth2Reducer,
        feed: feedReducer,
        mainPage: mainPageReducer,
    };

    return combineReducers(reducers);
}