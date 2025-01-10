import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";

import burgerConstructorSlice from './burger-constructor/burger-constructor-slice.ts';
import ingredientsSlice from './ingredients/ingredients-slice.ts';
import orderSlice from './order/order-slice.ts';
import userSlice from "./user/user-slice.ts";
import {useDispatch as dispatchHook, useSelector as selectorHook} from "react-redux";

const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice);

type RootState = ReturnType<typeof rootReducer>;

export const configureStore = (initialState?: RootState) => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};

export const store = configureStore();
type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();