import {combineReducers} from "redux";
import {NavigationConfig} from "../../navigation/config";
import {IAppState, INavigationState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";
import {authReducer} from "../../modules/auth/authReducer";
import {mainPageReducer} from "../../modules/mainPage/mainPageReducer";
import {cafePageReducer} from "../../modules/cafePage/cafePageReducer";
import {coffeePageReducer} from "../../modules/coffeePage/coffeePageReducer";
import {regPageReducer} from "../../modules/regPage/regPageReducer";

export function createMainReducer(): any {
    const navigationReducers: Reducers<INavigationState> = NavigationConfig.instance.getReducer();

    const reducers: Reducers<IAppState> = {
        navigation: combineReducers(navigationReducers),
        system: systemReducer,
        auth2: authReducer,
        mainPage: mainPageReducer,
        cafePage: cafePageReducer,
        coffeePage: coffeePageReducer,
        regPage: regPageReducer,
    };

    return combineReducers(reducers);
}