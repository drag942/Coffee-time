import {AppRegistry} from "react-native";
import {appSettingsProvider} from "./core/settings";
import {App} from "./App";

// noinspection JSUnusedGlobalSymbols | used from js code
export function registerApp(): void {
    const rootComponent = App;
    AppRegistry.registerComponent(appSettingsProvider.settings.appName, () => rootComponent);
}
