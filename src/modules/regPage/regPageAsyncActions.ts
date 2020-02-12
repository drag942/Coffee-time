import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {IRegParams} from "../../types/interfaces";

import {AuthHelper} from "../../common/helpers/authHelper";
import {RegPageActions} from "./regPageActions";
import {UserClientRequest, UserRequest} from "../../core/api/CoffeeRequest";

const userClientRequest = new UserClientRequest();

export class RegPageAsyncActions {
    static registration(email: string, password: string, confrimPassword: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IRegParams = {
                email,
                password,
                confrimPassword
            };

            try {
                dispatch(RegPageActions.registration.started(params));
                AuthHelper.checkEmail(params.email);
                AuthHelper.checkPassword(params.password);
                AuthHelper.checkConfrimPassword(params.password, params.confrimPassword);
                const userRequest  = new UserRequest({email: email, password});
                const token =  await userClientRequest.register(userRequest) || "NullToken";
                dispatch(RegPageActions.registration.done({params, result: token}));
            } catch (error) {
                dispatch(RegPageActions.registration.failed({params, error}));
            }
        };
    }
}
