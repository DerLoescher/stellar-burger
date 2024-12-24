import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";

import burgerConstructorSlice from './burger-constructor/burger-constructor-slice.js';
import ingredientsSlice from './ingredients/ingredients-slice.js';
import orderSlice from './order/order-slice.js';
import userSlice from "./user/user-slice.js";


const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice);

export const configureStore = (initialState) => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};