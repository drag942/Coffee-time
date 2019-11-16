import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {showToast} from "../../common/showToast";
import {MainPageActions} from "./mainPageActions";
import {CafeClientRequest} from "../../core/api/CoffeeRequest";
import {Auth} from "../../core/api/Auth";

const cafeClientRequest = new CafeClientRequest();

export class MainPageAsyncActions {

    static getCafes(): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IEmpty = {
            };

            try {
                dispatch(MainPageActions.getCafes.started(params));
                const result = await cafeClientRequest.getAll(Auth.sessionId);
                dispatch(MainPageActions.getCafes.done({params, result}));
            } catch (error) {
                showToast(error.message)
                dispatch(MainPageActions.getCafes.failed({params, error}));
            }
        };
    }
}