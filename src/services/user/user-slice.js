import {createSlice} from '@reduxjs/toolkit';
import {editUser, getUser, login, logout, register} from "./user-actions.js";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthChecked: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(register.fulfilled, (state, action) => {
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
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.error = null;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
    },
});

export default userSlice;