import {NavigationState, DrawerNavigationState} from "react-navigation";
import {EntitiesInitialState, IEntitiesState} from "../../modules/entities/entitiesState";
import {NavigationConfig} from "../../navigation/config";
import {ISystemState, SystemInitialState} from "./systemState";
import {AuthInitialState, IAuthState} from "../../modules/auth/authState";
import {IPlannedRunState, PlannedRunInitialState} from "../../modules/plannedRuns/plannedRunState";
import {CurrentRunInitialState, ICurrentRunState} from "../../modules/currentRun/currentRunState";
import {AuthInitialState2, IAuthState2} from "../../modules/auth2/authState2";
import {FeedInitialState, IFeedState} from "../../modules/feed/feedState";
import {IMainPageState, MainPageInitialState} from "../../modules/mainPage/mainPageState";
import {CafeInitialState, ICafePageState} from "../../modules/cafePage/cafePageState";
import {CoffeeInitialState, ICoffeePageState} from "../../modules/coffeePage/coffeePageState";

export interface IAppState {
    navigation: INavigationState;
    system: ISystemState;
    entities: IEntitiesState;
    auth: IAuthState;
    auth2: IAuthState2;
    plannedRuns: IPlannedRunState;
    currentRun: ICurrentRunState;
    feed: IFeedState;
    mainPage: IMainPageState;
    cafePage: ICafePageState;
    coffeePage: ICoffeePageState;
}

export interface INavigationState {
    root: NavigationState;
    menu: DrawerNavigationState;
    currentRun: NavigationState;
    plannedRuns: NavigationState;
}

export function getAppInitialState(): IAppState {
    const NavigationInitialState: INavigationState = NavigationConfig.instance.getCombinedInitialState();

    return {
        navigation: NavigationInitialState,
        system: SystemInitialState,
        entities: EntitiesInitialState,
        auth: AuthInitialState,
        plannedRuns: PlannedRunInitialState,
        currentRun: CurrentRunInitialState,
        auth2: AuthInitialState2,
        feed: FeedInitialState,
        mainPage: MainPageInitialState,
        cafePage: CafeInitialState,
        coffeePage: CoffeeInitialState,
    };
}