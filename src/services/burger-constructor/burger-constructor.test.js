import burgerConstructorSlice, {
    addIngredient,
    moveConstructorItem,
    removeIngredient,
    resetConstructor
} from './burger-constructor-slice.ts';


const burgerConstructorReducer = burgerConstructorSlice.reducer;

const mockIngredient = {
    _id: '1',
    type: 'main',
    name: 'Биокотлета',
    uniqueId: 'fooId'
};


describe('burgerConstructorSlice', () => {

    const initialState = {
        currentBun: null,
        burgerIngredients: [],
    };

    it('should add bun ingredient', () => {
        const state = burgerConstructorReducer(initialState, addIngredient({type: 'bun'}));
        expect(state.currentBun).toEqual({type: 'bun', uniqueId: expect.any(String)});
    });

    it('should add other ingredient', () => {
        const state = burgerConstructorReducer(initialState, addIngredient({...mockIngredient}));
        expect(state.burgerIngredients).toHaveLength(1);
        expect(state.burgerIngredients[0]).toEqual({...mockIngredient, uniqueId: expect.any(String)});
    });

    it('should remove ingredient', () => {
        const stateWithIngredients = {
            ...initialState,
            burgerIngredients: [mockIngredient]
        };

        const state = burgerConstructorReducer(stateWithIngredients, removeIngredient(mockIngredient._id));
        expect(state.burgerIngredients).toHaveLength(0);
    });

    it('should move constructor item', () => {
        const stateWithIngredients = {
            ...initialState,
            burgerIngredients: [
                {...mockIngredient, uniqueId: 'fooId', _id: '1'},
                {_id: '2', uniqueId: 'barId'}
            ]
        };

        const state = burgerConstructorReducer(stateWithIngredients, moveConstructorItem({
            fromUniqueId: 'fooId',
            toUniqueId: 'barId'
        }));
        expect(state.burgerIngredients[0]._id).toBe('2');
        expect(state.burgerIngredients[1]._id).toBe('1');
    });

    it('should reset constructor', () => {
        const stateWithIngredients = {
            ...initialState,
            currentBun: mockIngredient,
            burgerIngredients: [mockIngredient]
        };

        const state = burgerConstructorReducer(stateWithIngredients, resetConstructor());
        expect(state.currentBun).toBeNull();
        expect(state.burgerIngredients).toHaveLength(0);
    });
});