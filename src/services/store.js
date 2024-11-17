import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';

import burgerConstructorSlice from './burger-constructor/burger-constructor-slice.js';
import ingredientsSlice from './ingredients/ingredients-slice.js';
import ingredientDetailsSlice from './ingredient-details/ingredient-details-slice.js';
import orderSlice from './order/order-slice.js';


const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, ingredientDetailsSlice, orderSlice);

export const configureStore = (initialState) => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
        devTools: composeWithDevTools(),
    });
};