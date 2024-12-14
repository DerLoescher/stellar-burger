import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithRefresh} from "../../utils/api.ts";
import {ORDERS_ENDPOINT} from "../../utils/dictionary.ts";
import {resetConstructor} from "../burger-constructor/burger-constructor-slice.js";


export const createOrder = createAsyncThunk(
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