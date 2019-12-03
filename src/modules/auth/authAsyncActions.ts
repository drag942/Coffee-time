import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {AuthActions} from "./authActions";
import {IAuth2Params} from "../../types/interfaces";

import {AuthHelper2} from "../../common/helpers/AuthHelper2";
import {Auth} from "../../core/api/Auth";
import {appSettingsProvider} from "../../core/settings";

export class AuthAsyncActions {
    static login(login: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IAuth2Params = {
                login,
                password
            };

            try {
                dispatch(AuthActions.login.started(params));
                if (appSettingsProvider.settings.environment !== "Development") {
                    AuthHelper2.checkEmail(params.login);
                    AuthHelper2.checkPassword(params.password);
                }

                const token =  await Auth.getSessionId(params.login, params.password) || "NullToken";
                console.log(token);

                dispatch(AuthActions.login.done({params, result: token}));
            } catch (error) {
                dispatch(AuthActions.login.failed({params, error}));
            }
        };
    }
}