import {BASE_DOMAIN} from "./dictionary.js";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function useFetch(endpoint, options = {}) {
    return fetch(`${BASE_DOMAIN}${endpoint}`, options).then(checkResponse);
}