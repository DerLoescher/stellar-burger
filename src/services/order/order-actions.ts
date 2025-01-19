import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithRefresh} from "../../utils/api.ts";
import {ORDERS_ENDPOINT} from "../../utils/dictionary.ts";
import {resetConstructor} from "../burger-constructor/burger-constructor-slice.ts";


export const createOrder = createAsyncThunk<TCreateOrderResponse, string[]>(
    'order/createOrder',
    async (ingredientsIds, {dispatch}) => {
        const response = await fetchWithRefresh(ORDERS_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: ingredientsIds}),
            })

        dispatch(resetConstructor());

        return response;
    }
);

export const loadOrderDetail = createAsyncThunk<TOrderDetailResponse, string>(
    'order/loadOrderDetail',
    async (orderId: string, {dispatch}) => {
        const response = await fetchWithRefresh(`${ORDERS_ENDPOINT}/${orderId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

        dispatch(resetConstructor());

        return response;
    }
);