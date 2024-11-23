import {BASE_DOMAIN} from "./dictionary.js";

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
    return fetch(`${BASE_DOMAIN}/api/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }

            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export function fetchWithCheck(endpoint, options = {}) {
    return fetch(`${BASE_DOMAIN}${endpoint}`, options).then(checkResponse);
}

export const fetchWithRefresh = async (endpoint, options) => {
    options = {
        ...options,
        headers: {
            ...options?.headers,
            "Authorization": localStorage.getItem("accessToken"),
        },
    };


    try {
        const response = await fetchWithCheck(endpoint, options);
        return response;
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;

            return fetchWithCheck(endpoint, options);
        } else {
            return Promise.reject(err);
        }
    }
};

