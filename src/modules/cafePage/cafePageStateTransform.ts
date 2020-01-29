import {createTransform} from "redux-persist";
import {ICafePageState} from "./cafePageState";

export const cafePageStateTransform = createTransform(
    (state: ICafePageState) => {
        return {
            ...state,
            products: Array.from(state.products) as any,
        };
    },
    (storedState: ICafePageState) => {
        if (storedState) {
            return {
                ...storedState,
                products: new Map(storedState.products),
            };
        } else {
            return storedState;
        }
    },
    {
        whitelist: ["cafePage"]
    }
);