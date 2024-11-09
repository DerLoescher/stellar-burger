import {createAsyncThunk} from "@reduxjs/toolkit";
import {ORDERS_API} from "../../utils/dictionary.js";

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (ingredientsIds = [], {rejectWithValue}) => {
        try {
            const response = await fetch(ORDERS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: ingredientsIds}),
            });

            if (!response.ok) {
                return rejectWithValue(`Ошибка ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);