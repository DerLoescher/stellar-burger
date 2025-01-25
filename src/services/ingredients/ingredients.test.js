import ingredientsSlice, {initialState} from './ingredients-slice.ts';
import {loadIngredients} from "./ingredients-actions.ts";

const ingredientsSliceReducer = ingredientsSlice.reducer;

describe('ingredientsSlice', () => {
    it('should handle loadIngredients.pending', () => {
        const nextState = ingredientsSliceReducer(initialState, loadIngredients.pending());
        expect(nextState.status).toBe('loading');
        expect(nextState.error).toBeUndefined();
    });

    it('should handle loadIngredients.fulfilled', () => {
        const mockIngredients = [{ _id: '1', name: 'Краторная булка' }, { _id: '2', name: 'Биокотлета' }];
        const nextState = ingredientsSliceReducer(initialState, loadIngredients.fulfilled(mockIngredients));
        expect(nextState.status).toBe('succeeded');
        expect(nextState.allIngredients).toEqual(mockIngredients);
    });

    it('should handle loadIngredients.rejected', () => {
        const errorMessage = 'Не удалось загрузить список ингредиентов';
        const nextState = ingredientsSliceReducer(initialState, loadIngredients.rejected({ message: errorMessage }));
        expect(nextState.status).toBe('failed');
        expect(nextState.error).toBe(errorMessage);
        expect(nextState.allIngredients).toEqual([]);
    });
});