import {ProductFullInfo} from "../../core/api/CoffeeRequest";
import {LoadState} from "../../common/loadState";

export interface ICoffeePageState {
    product: ProductFullInfo;
    loadState: LoadState;
    error: string | null;
}

export const CoffeeInitialState: ICoffeePageState = {
    product: {
        toJSON(data?: any): any {
        },
        imagesPath: "",
        cofeName: "",
        cofeId: "",
        id: "",
        price: 0,
        attribute: [],
        productName: "",
        favarite: false,
        init(data?: any): any {
        }
    },
    loadState: LoadState.needLoad,
    error: null,
};