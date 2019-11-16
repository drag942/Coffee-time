import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {Auth2Actions} from "./auth2Actions";
import {IAuth2Params} from "../../types/interfaces";

import {AuthHelper2} from "../../common/helpers/AuthHelper2";
import {showToast} from "../../common/showToast";
import {Auth} from "../../core/api/Auth";

export class Auth2AsyncActions {
    static login(login: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IAuth2Params = {
                login,
                password
            };

            try {
                dispatch(Auth2Actions.login.started(params));
                AuthHelper2.checkEmail(params.login);
                AuthHelper2.checkPassword(params.password);

               const token =  await Auth.getSessionId() || "NullToken";
                console.log(token)

                dispatch(Auth2Actions.login.done({params, result: token}));
            } catch (error) {
                showToast(error.message)
                dispatch(Auth2Actions.login.failed({params, error}));
            }
        };
    }
}