
import {LoadState} from "../../common/loadState";
import {CafeInfo} from "../../core/api/CoffeeRequest";

export interface IMainPageState {
    cafes: CafeInfo[];
    loadState: LoadState;
    error: string | null;
}

export const MainPageInitialState: IMainPageState = {
    cafes: [],
    loadState: LoadState.needLoad,
    error: null,
};