import {BASE_DOMAIN} from "./dictionary.ts";

interface IRefreshData {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}

interface IFetchOptions extends RequestInit {
    headers?: {
        [key: string]: string;
    };
}


function checkResponse(res: Response): Promise<IRefreshData | never> {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = async (): Promise<IRefreshData> => {
    const response = await fetch(`${BASE_DOMAIN}/api/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });

    const refreshData = await checkResponse(response);
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }

    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;

};

export function fetchWithCheck(endpoint: string, options: IFetchOptions = {}): Promise<any> {
    return fetch(`${BASE_DOMAIN}${endpoint}`, options).then(checkResponse);
}


export const fetchWithRefresh = async (endpoint: string, options?: IFetchOptions): Promise<any> => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    options = {
        ...options,
        headers: {
            ...options?.headers,
            "Authorization": accessToken || '',
        },
    };


    try {
        const response = await fetchWithCheck(endpoint, options);
        return response;
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers!.authorization = refreshData.accessToken;

            return fetchWithCheck(endpoint, options);
        } else {
            return Promise.reject(err);
        }
    }
};

