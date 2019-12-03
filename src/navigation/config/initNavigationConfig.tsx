import {appSettingsProvider} from "../../core/settings";
import { NoHeaderNavigation} from "../../core/theme/navigation";

import {rootNavigationReducer, RootNavigator} from "../configurations/rootNavigationConfiguration";
import {NavigationActions} from "../navigation";
import {NavigationConfig} from "./NavigationConfig";
import {reduxHelper} from "./reduxHelper";

export function initNavigationConfig(): void {
    const isRehydrateEnabled = appSettingsProvider.settings.environment == "Development";

    NavigationConfig.instance = reduxHelper({
        root: {
            isRehydrateEnabled,
            customReducer: rootNavigationReducer,
            navigator: RootNavigator,
            navigationOptions: NoHeaderNavigation,
            backAction: NavigationActions.internal.backInRoot
        },
    });
}