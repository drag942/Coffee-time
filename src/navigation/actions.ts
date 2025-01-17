import {
    NavigationAction,
    NavigationActions,
    DrawerActions,
    NavigationToggleDrawerAction,
    NavigationCloseDrawerAction,
} from "react-navigation";
import {SimpleThunk} from "../common/simpleThunk";
import {actionCreator} from "../core/store";
import {getBackAction} from "./navigation";
import {Pages} from "./pages";

const NavigationPages = new Pages();

function simpleToRoute(routeName: string): () => NavigationAction {
    return (): NavigationAction => NavigationActions.navigate({routeName});
}

function routeWithParams<T>(routeName: string): (params: T) => NavigationAction {
    return (params: T): NavigationAction => NavigationActions.navigate({routeName, params});
}

function toggleDrawer(): () => NavigationToggleDrawerAction {
    return (): NavigationToggleDrawerAction => DrawerActions.toggleDrawer();
}

function closeMenu(): () => NavigationCloseDrawerAction {
    return (): NavigationCloseDrawerAction => DrawerActions.closeDrawer();
}

export class Actions {
    toggleDrawer = toggleDrawer();
    closeMenu = closeMenu();

    navigateToInDevelopment = simpleToRoute(NavigationPages.inDeveloping);
    navigateToCafePage = routeWithParams<ICommonNavParams>(NavigationPages.cafePage);
    navigateToCoffeePage = routeWithParams<ICommonNavParams>(NavigationPages.coffeePage);
    navigateToRegPage  = simpleToRoute(NavigationPages.regPage);
    navigateToAuth = simpleToRoute(NavigationPages.auth);

    navigateToBack = (): SimpleThunk => {
        return async (dispatch, getState): Promise<void> => {
            const backAction = getBackAction(getState().navigation);

            if (backAction != null) {
                dispatch(backAction);
            }
        };
    };

    internal = {
        backInRoot: actionCreator("AppNavigation/BACK_IN_ROOT"),
    };
}

export interface ICommonNavParams {
    id: string;
}