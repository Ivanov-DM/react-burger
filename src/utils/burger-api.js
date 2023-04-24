import {BURGER_API_URL} from "./constants";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const getIngredients = () => request(
    `${BURGER_API_URL}/ingredients`
);

export const createOrder = (ingredients) => request(
    `${BURGER_API_URL}/orders`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredients
        })
    }
);
