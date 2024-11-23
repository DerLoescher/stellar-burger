import {createSlice} from '@reduxjs/toolkit';
import {editUser, getUser, login, logout, register} from "./user-actions.js";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthChecked: false,
        user: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;

            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    },
});

export default userSlice;
