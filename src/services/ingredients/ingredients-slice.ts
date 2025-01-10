import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadIngredients} from "./ingredients-actions.ts";


interface IngredientsState {
    allIngredients: TIngredient[];
    status: TStatus;
    error: string | undefined;
}

const initialState: IngredientsState = {
    allIngredients: [],
    status: 'idle',
    error: undefined,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
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
