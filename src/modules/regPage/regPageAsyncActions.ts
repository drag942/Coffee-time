import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {IRegParams} from "../../types/interfaces";

import {AuthHelper2} from "../../common/helpers/AuthHelper2";
import {showToast} from "../../common/showToast";
import {RegPageActions} from "./regPageActions";
import {UserClientRequest, UserRequest} from "../../core/api/CoffeeRequest";

const userClientRequest = new UserClientRequest();

export class RegPageAsyncActions {
    static registration(email: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IRegParams = {
                email,
                password,
            };

            try {
                dispatch(RegPageActions.registration.started(params));
                    AuthHelper2.checkEmail(params.email);
                    AuthHelper2.checkPassword(params.password);
                     const userRequest  = new UserRequest({email: email, password});
                const token =  await userClientRequest.register(userRequest) || "NullToken";
                dispatch(RegPageActions.registration.done({params, result: token}));
            } catch (error) {
                showToast(error.message);
                dispatch(RegPageActions.registration.failed({params, error}));
            }
        };
    }
}
