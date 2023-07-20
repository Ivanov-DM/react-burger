import { BURGER_API_URL } from "./constants";
import {getCookie, setCookie} from "./cookie";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const createOrderRequest = (ingredientsId) =>
  request(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });

export const getIngredientsRequest = () =>
  request(`${BURGER_API_URL}/ingredients`);

export const loginRequest = ({email, password}) =>
    request(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

export const registerRequest = ({email, password, name}) =>
    request(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name
        }),
    });

export const getUserRequest = () =>
    request(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
    });

export const updateUserRequest = (data) =>
    request(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ...data
        })
    });


export const forgotPasswordRequest = (email) =>
    request(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email
        })
    });

export const resetPasswordRequest = ({password, token}) =>
    request(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            token
        })
    });

export const refreshToken = () =>
    request(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    });

export const fetchWithRefresh = async (url, options) => {
    try {
        return await request(url, options);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            setCookie('refreshToken', refreshData.refreshToken);
            setCookie('accessToken', refreshData.accessToken);
            options.headers.autorization = refreshData.accessToken;
            return await request(url, options);
        } else {
            return Promise.reject(err);
        }
    }
}


export const logoutRequest = () =>
    request(`${BURGER_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    });

