import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {editUser, getUser, login, logout, register} from "./user-actions.ts";

interface UserState {
    isAuthChecked: boolean;
    user: TUser | null;
    error: string | undefined | null;
}

export const initialState: UserState = {
    isAuthChecked: false,
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.error = null;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(editUser.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.user = action.payload;
                state.error = null;
            })
    },
});

export default userSlice;
