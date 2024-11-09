import {createSlice} from '@reduxjs/toolkit';
import {loadIngredients} from "./ingredients-actions.js";


const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        allIngredients: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allIngredients = action.payload;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.allIngredients = [];
            });
    },
});

export default ingredientsSlice;
