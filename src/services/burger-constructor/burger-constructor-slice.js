import {createSlice} from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        currentBun: null,
        burgerIngredients: [],
    },
    reducers: {
        addIngredient(state, action) {
            if (action.payload.type === 'bun') {
                state.currentBun = action.payload;
            } else {
                state.burgerIngredients.push(action.payload);
            }
        },
        removeIngredient(state, action) {
            const ingredientIndex = state.burgerIngredients.findIndex(ingredient => ingredient._id === action.payload);
            state.burgerIngredients.splice(ingredientIndex, 1);
        },
        moveConstructorItem(state, action) {
            const {fromIndex, toIndex} = action.payload;
            const movedIngredient = state.burgerIngredients[fromIndex];

            state.burgerIngredients.splice(fromIndex, 1);
            state.burgerIngredients.splice(toIndex, 0, movedIngredient);
        }
    }
});

export const {addIngredient, removeIngredient, moveConstructorItem} = burgerConstructorSlice.actions;
export default burgerConstructorSlice;
