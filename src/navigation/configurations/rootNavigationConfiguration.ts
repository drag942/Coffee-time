import {
    createStackNavigator,
    NavigationAction,
    NavigationActions,
    NavigationState,
    StackActions
} from "react-navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Colors, isIos} from "../../core/theme";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";
import {AuthPage} from "../../modules/auth/AuthPage";
import {AuthActions} from "../../modules/auth/authActions";
import {MainPage} from "../../modules/mainPage/mainPage";
import {CafePage} from "../../modules/cafePage/cafePage";
import {CoffeePage} from "../../modules/coffeePage/coffeePage";
import {RegPage} from "../../modules/regPage/regPage";
import {RegPageActions} from "../../modules/regPage/regPageActions";

export const RootNavigator = createStackNavigator({
    [NavigationPages.auth]: {screen: AuthPage},
    [NavigationPages.regPage] : {screen: RegPage},
    [NavigationPages.mainPage]: {screen: MainPage},
    [NavigationPages.cafePage]: {screen: CafePage},
    [NavigationPages.coffeePage]: {screen: CoffeePage},
    [NavigationPages.inDeveloping]: {screen: InDeveloping},
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
        case AuthActions.login.done.type:
            return RootNavigator.router.getStateForAction(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate(
                        {routeName: NavigationPages.mainPage,
                        })
                ]
            }), state);
        case RegPageActions.registration.done.type:
            return RootNavigator.router.getStateForAction(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate(
                        {routeName: NavigationPages.auth,
                        })
                ]
            }), state);
        default:
            return RootNavigator.router.getStateForAction(action, state);
    }
}