import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {showToast} from "../../common/showToast";
import {CafeRequest, ProductClientRequest} from "../../core/api/CoffeeRequest";
import {CafePageActions} from "./cafePageActions";
import {IAppState} from "../../core/store/appState";

const productClientRequest = new ProductClientRequest();

export class CafePageAsyncActions {

    static getProducts(cafeId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            const params: IEmpty = {
            };
            try {
                dispatch(CafePageActions.getProducts.started(params));
                const sessionId =  getState().system.authToken;
                const cafeRequest = new CafeRequest({cafeId, sessionId});

                const result = await productClientRequest.getProductsCafe(cafeRequest);
                dispatch(CafePageActions.getProducts.done({params, result}));
            } catch (error) {
                showToast(error.message);
                dispatch(CafePageActions.getProducts.failed({params, error}));
            }
        };
    }
}