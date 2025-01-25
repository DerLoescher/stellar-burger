import userSlice, {initialState} from './user-slice.ts';
import {editUser, getUser, login, logout, register} from './user-actions.ts'

const userSliceReducer = userSlice.reducer;

describe('userSlice', () => {
    it('should handle login.fulfilled', () => {
        const mockUser = {id: 1, name: 'Иван'};
        const nextState = userSliceReducer(initialState, login.fulfilled(mockUser));
        expect(nextState.user).toEqual(mockUser);
        expect(nextState.isAuthChecked).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it('should handle login.rejected', () => {
        const errorMessage = 'Ошибка авторизации';
        const nextState = userSliceReducer(initialState, login.rejected({message: errorMessage}));
        expect(nextState.error).toBe(errorMessage);
    });

    it('should handle register.fulfilled', () => {
        const mockUser = {id: 2, name: 'Петр'};
        const nextState = userSliceReducer(initialState, register.fulfilled(mockUser));
        expect(nextState.user).toEqual(mockUser);
        expect(nextState.isAuthChecked).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it('should handle register.rejected', () => {
        const errorMessage = 'Ошибка регистрации';
        const nextState = userSliceReducer(initialState, register.rejected({message: errorMessage}));
        expect(nextState.error).toBe(errorMessage);
    });

    it('should handle logout.fulfilled', () => {
        const loggedInState = {
            isAuthChecked: true,
            user: {id: 1, name: 'Андрей'},
            error: null,
        };
        const nextState = userSliceReducer(loggedInState, logout.fulfilled());
        expect(nextState.user).toBeNull();
        expect(nextState.error).toBeNull();
    });

    it('should handle getUser.fulfilled', () => {
        const mockUser = {id: 3, name: 'Михаил'};
        const nextState = userSliceReducer(initialState, getUser.fulfilled(mockUser));
        expect(nextState.user).toEqual(mockUser);
        expect(nextState.isAuthChecked).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it('should handle getUser.rejected', () => {
        const nextState = userSliceReducer(initialState, getUser.rejected());
        expect(nextState.isAuthChecked).toBe(true);
        expect(nextState.user).toBeNull();
    });

    it('should handle editUser.fulfilled', () => {
        const currentState = {
            isAuthChecked: true,
            user: {id: 1, name: 'Илья'},
            error: null,
        };
        const updatedUser = {id: 1, name: 'Илюша'};
        const nextState = userSliceReducer(currentState, editUser.fulfilled(updatedUser));
        expect(nextState.user).toEqual(updatedUser);
        expect(nextState.error).toBeNull();
    });
});