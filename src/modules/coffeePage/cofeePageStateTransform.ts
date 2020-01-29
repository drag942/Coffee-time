import {createTransform} from "redux-persist";

import {ICoffeePageState} from "./coffeePageState";

export const coffeePageStateTransform = createTransform(
    (state: ICoffeePageState) => {
        return {
            ...state,
            product: Array.from(state.product) as any,
        };
    },
    (storedState: ICoffeePageState) => {
        if (storedState) {
            return {
                ...storedState,
                product: new Map(storedState.product),
            };
        } else {
            return storedState;
        }
    },
    {
        whitelist: ["coffeePage"]
    }
);