import {createAsyncThunk} from "@reduxjs/toolkit";
import {INGREDIENTS_LIST_API} from "../../utils/dictionary.js";


export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(INGREDIENTS_LIST_API);
            if (!response.ok) {
                return rejectWithValue(`Ошибка ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);