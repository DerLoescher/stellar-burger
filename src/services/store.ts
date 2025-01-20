import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";

import burgerConstructorSlice from './burger-constructor/burger-constructor-slice.ts';
import ingredientsSlice from './ingredients/ingredients-slice.ts';
import orderSlice from './order/order-slice.ts';
import userSlice from "./user/user-slice.ts";
import {useDispatch as dispatchHook, useSelector as selectorHook} from "react-redux";

import {feedSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./feed/feed-slice.ts";

import {socketMiddleware} from "./middleware/socket-middleware.ts";
import {wsConnect, wsDisconnect} from "./feed/feed-actions.ts";


const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice, feedSlice);

const feedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
});

export type RootState = ReturnType<typeof rootReducer>;

export const configureStore = (initialState?: RootState) => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(feedMiddleware)
        }
    });
};

export const store = configureStore();
type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();