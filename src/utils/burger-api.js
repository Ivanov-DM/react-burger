import { BURGER_API_URL } from "./constants";

export function getIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}
