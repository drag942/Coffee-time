import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {showToast} from "../../common/showToast";
import {MainPageActions} from "./mainPageActions";
import {CafeClientRequest} from "../../core/api/CoffeeRequest";
import {IAppState} from "../../core/store/appState";

const cafeClientRequest = new CafeClientRequest();

export class MainPageAsyncActions {

    static getCafes(): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            const params: IEmpty = {
            };

            try {
                dispatch(MainPageActions.getCafes.started(params));
                const result = await cafeClientRequest.getAll(getState().system.authToken);
                dispatch(MainPageActions.getCafes.done({params, result}));
            } catch (error) {
                showToast(error.message);
                dispatch(MainPageActions.getCafes.failed({params, error}));
            }
        };
    }
}