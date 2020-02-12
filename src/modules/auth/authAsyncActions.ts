import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {AuthActions} from "./authActions";
import {IAuthParams} from "../../types/interfaces";

import {AuthHelper} from "../../common/helpers/authHelper";
import {Auth} from "../../core/api/Auth";
import {appSettingsProvider} from "../../core/settings";
import {localization} from "../../common/localization/localization";

export class AuthAsyncActions {
    static login(login: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IAuthParams = {
                login,
                password,
            };

            try {
                dispatch(AuthActions.login.started(params));
                if (appSettingsProvider.settings.environment != "Development") {
                    AuthHelper.checkEmail(params.login);
                    AuthHelper.checkPassword(params.password);
                }
                const token =  await Auth.getSessionId(params.login, params.password) || "NullToken";
                console.log(token);
                if (token == "NullToken") {
                    throw new Error(localization.errors.loginError);
                    alert(localization.errors.loginError);
                }

                dispatch(AuthActions.login.done({params, result: token}));
            } catch (error) {
                dispatch(AuthActions.login.failed({params, error}));
            }
        };
    }
}