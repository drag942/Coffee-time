import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {showToast} from "../../common/showToast";
import {FavoriteClientRequest, ProductClientRequest, ProductRequest} from "../../core/api/CoffeeRequest";
import {IAppState} from "../../core/store/appState";
import {CoffeePageActions, ICoffeePageParams} from "./coffeePageActions";
import {LoadState} from "../../common/loadState";

const productClientRequest = new ProductClientRequest();
const favoriteClientRequest = new FavoriteClientRequest();

export class CoffeePageAsyncActions {

    static getProduct(loadState: LoadState, productId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            const params: ICoffeePageParams = {
                loadState: loadState,
                id: productId,
            };
            try {
                dispatch(CoffeePageActions.getProduct.started(params));
                const sessionId =  getState().system.authToken;
                const productRequest = new ProductRequest({productId, sessionId});

                const result = await productClientRequest.getProduct(productRequest);
                dispatch(CoffeePageActions.getProduct.done({params, result}));
            } catch (error) {
                showToast(error.message);
                dispatch(CoffeePageActions.getProduct.failed({params, error}));
            }
        };
    }
    static setFavorite(productId: string, callback: (loadState: LoadState) => void): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            const params: IEmpty = {
            };
            try {
                dispatch(CoffeePageActions.setFavorite.started(params));
                const sessionId =  getState().system.authToken;
                const productRequest = new ProductRequest({productId, sessionId});
                const result = await favoriteClientRequest.set(productRequest);
                dispatch(CoffeePageActions.setFavorite.done({params, result}));
                callback(getState().coffeePage.loadState);
            } catch (error) {
                showToast(error.message);
                dispatch(CoffeePageActions.setFavorite.failed({params, error}));
            }
        };
    }
    static unsetFavorite(productId: string, callback: (loadState: LoadState) => void): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            const params: IEmpty = {
            };
            try {
                dispatch(CoffeePageActions.unsetFavorite.started(params));
                const sessionId =  getState().system.authToken;
                const productRequest = new ProductRequest({productId, sessionId});
                const result = await favoriteClientRequest.unset(productRequest);
                dispatch(CoffeePageActions.unsetFavorite.done({params, result}));
                callback(getState().coffeePage.loadState);
            } catch (error) {
                showToast(error.message);
                dispatch(CoffeePageActions.setFavorite.failed({params, error}));
            }
        };
    }
}