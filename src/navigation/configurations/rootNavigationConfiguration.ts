import {
    createStackNavigator,
    NavigationAction,
    NavigationActions,
    NavigationComponent,
    NavigationState,
    StackActions
} from "react-navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import {Playground} from "../../common/playground";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Colors, isIos} from "../../core/theme";
import {AuthPage} from "../../modules/auth/AuthPage";
import {NavigationConfig} from "../config";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";
import {AuthPage2} from "../../modules/auth2/AuthPage2";
import {Auth2Actions} from "../../modules/auth2/auth2Actions";
import {Feed} from "../../modules/feed/Feed";
import {MainPage} from "../../modules/mainPage/mainPage";
import {CafePage} from "../../modules/cafePage/cafePage";
import {CoffeePage} from "../../modules/coffeePage/coffeePage";

export const RootNavigator = createStackNavigator({
    [NavigationPages.auth]: {screen: AuthPage2},
    [NavigationPages.mainPage]: {screen: MainPage},
    [NavigationPages.cafePage]: {screen: CafePage},
    [NavigationPages.coffeePage]: {screen: CoffeePage},
    [NavigationPages.feed] : {screen: Feed},
    [NavigationPages.login]: {screen: AuthPage},
    [NavigationPages.playground]: {screen: Playground},
    [NavigationPages.inDeveloping]: {screen: InDeveloping},
    [NavigationPages.menu]: {
        getScreen: (): NavigationComponent => NavigationConfig.instance.getNavigationComponent("menu")
    },
}, {
    headerMode: "screen",
    cardStyle: {
        backgroundColor: isIos ? Colors.white : Colors.transparent
    },
});

extendWithDontPushTwoPageInStack(RootNavigator.router);

export const RootNavigationInitialState = RootNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function rootNavigationReducer(
    state: NavigationState = RootNavigationInitialState,
    action: NavigationAction): NavigationState {
    switch (action.type) {
        case CoreActions.rehydrate.type:
            const appState = (action as any).payload as IAppState;

            if (appState != null && appState.system.authToken != null) {
                return RootNavigator.router.getStateForAction(StackActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: NavigationPages.mainPage,
                            })
                        ]
                    }
                ), state);
            }

            return {...RootNavigationInitialState};
        case Auth2Actions.login.done.type:
            return RootNavigator.router.getStateForAction(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate(
                        {routeName: NavigationPages.mainPage,
                        })
                ]
            }), state);
        default:
            return RootNavigator.router.getStateForAction(action, state);
    }
}