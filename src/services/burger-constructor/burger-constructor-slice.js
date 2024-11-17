import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        currentBun: null,
        burgerIngredients: [],
    },
    reducers: {
        addIngredient: {
            reducer: (state, action) => {
                if (action.payload.type === 'bun') {
                    state.currentBun = action.payload;
                } else {
                    state.burgerIngredients.push(action.payload);
                }
            },
            prepare: (ingredient) => {
                return {
                    payload: {
                        ...ingredient,
                        uniqueId: uuidv4()
                    }
                }
            }
        },
        removeIngredient(state, action) {
            const ingredientIndex = state.burgerIngredients.findIndex(ingredient => ingredient._id === action.payload);
            state.burgerIngredients.splice(ingredientIndex, 1);
        },
        moveConstructorItem(state, action) {
            const {fromUniqueId, toUniqueId} = action.payload;

            const fromIndex = state.burgerIngredients.findIndex(ingredient => ingredient.uniqueId === fromUniqueId);
            const toIndex = state.burgerIngredients.findIndex(ingredient => ingredient.uniqueId === toUniqueId);
            const movedIngredient = state.burgerIngredients[fromIndex];

            state.burgerIngredients.splice(fromIndex, 1);
            state.burgerIngredients.splice(toIndex, 0, movedIngredient);
        },
        resetConstructor(state) {
            state.currentBun = null;
            state.burgerIngredients = [];
        }

    }
});

export const {addIngredient, removeIngredient, resetConstructor, moveConstructorItem} = burgerConstructorSlice.actions;
export default burgerConstructorSlice;
