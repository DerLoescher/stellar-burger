import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithCheck, fetchWithRefresh} from "../../utils/api.ts";
import {LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT, USER_ENDPOINT} from "../../utils/dictionary.ts";


export const login = createAsyncThunk<TUser, Omit<TUserForm, 'name'>>(
    'user/login',
    async ({email, password}) => {
        const response = await fetchWithCheck(LOGIN_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({email, password}),
            });

        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);

        return response.user;
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = fetchWithCheck(LOGOUT_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({token: localStorage.getItem("refreshToken")})
            });

        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        return response;
    }
);

export const register = createAsyncThunk<TUser, TUserForm>(
    'user/register',
    async ({name, email, password}) => {
        const response = await fetchWithCheck(REGISTER_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });

        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);

        return response.user;
    }
);


export const getUser = createAsyncThunk<TUser>(
    'user/getUser',
    async () => {
        const response = await fetchWithRefresh(USER_ENDPOINT,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("accessToken") || ''
                },
            });

        return response.user;
    }
)

export const editUser = createAsyncThunk<TUser, TUserForm>(
    'user/editUser',
    async (changedFields) => {
        const response = await fetchWithRefresh(USER_ENDPOINT,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("accessToken") || ''
                },
                body: JSON.stringify(changedFields)
            });

        return response.user;
    }
)