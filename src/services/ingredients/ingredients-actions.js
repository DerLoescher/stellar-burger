import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithRefresh} from "../../utils/api.js";
import {INGREDIENTS_LIST_ENDPOINT} from "../../utils/dictionary.js";

export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    async () => {
        const result = await fetchWithRefresh(INGREDIENTS_LIST_ENDPOINT);
        return result.data;
    }
);