import {NavigationState, DrawerNavigationState} from "react-navigation";
import {NavigationConfig} from "../../navigation/config";
import {ISystemState, SystemInitialState} from "./systemState";
import {AuthInitialState2, IAuthState2} from "../../modules/auth/authState";
import {IMainPageState, MainPageInitialState} from "../../modules/mainPage/mainPageState";
import {CafeInitialState, ICafePageState} from "../../modules/cafePage/cafePageState";
import {CoffeeInitialState, ICoffeePageState} from "../../modules/coffeePage/coffeePageState";
import {IRegState, RegInitialState} from "../../modules/regPage/regPageState";

export interface IAppState {
    navigation: INavigationState;
    system: ISystemState;
    auth2: IAuthState2;
    mainPage: IMainPageState;
    cafePage: ICafePageState;
    coffeePage: ICoffeePageState;
    regPage: IRegState;
}

export interface INavigationState {
    root: NavigationState;
    menu: DrawerNavigationState;
}

export function getAppInitialState(): IAppState {
    const NavigationInitialState: INavigationState = NavigationConfig.instance.getCombinedInitialState();

    return {
        navigation: NavigationInitialState,
        system: SystemInitialState,
        auth2: AuthInitialState2,
        mainPage: MainPageInitialState,
        cafePage: CafeInitialState,
        coffeePage: CoffeeInitialState,
        regPage: RegInitialState,
    };
}