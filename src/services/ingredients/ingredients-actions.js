import {createAsyncThunk} from "@reduxjs/toolkit";
import {useFetch} from "../../utils/api.js";
import {INGREDIENTS_LIST_ENDPOINT} from "../../utils/dictionary.js";

export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    async () => {
        const result = await useFetch(INGREDIENTS_LIST_ENDPOINT);
        return result.data;
    }
);