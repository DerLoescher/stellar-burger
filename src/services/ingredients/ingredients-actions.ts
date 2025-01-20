import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithRefresh} from "../../utils/api.ts";
import {INGREDIENTS_LIST_ENDPOINT} from "../../utils/dictionary.ts";

export const loadIngredients = createAsyncThunk<TIngredient[]>(
    'ingredients/loadIngredients',
    async () => {
        const result = await fetchWithRefresh(INGREDIENTS_LIST_ENDPOINT);
        return result.data;
    }
);