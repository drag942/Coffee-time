import {actionCreator} from "../../core/store";
import {ProductBriefInfo} from "../../core/api/CoffeeRequest";

export class CafePageActions {
    static getProducts = actionCreator.async<IEmpty, ProductBriefInfo[], Error>("CAFEPAGE/GET_PRODUCTS");
}