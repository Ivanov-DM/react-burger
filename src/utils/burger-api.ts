import { BURGER_API_URL } from "./constants";
import { getCookie, setCookie } from "./cookie";
import {
    TGetIngredientsResponse,
    TRefreshData,
    TCreateOrderResponse,
    TGetOrderResponse, TAuthResponse, TUserRequestData
} from "../services/types/data";

type TApiOptions = {
    method: string;
    headers: HeadersInit;
    body?: string
}

const checkResponse = <T>(res: Response): Promise<T> | Error => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

const request = <T>(url: string, options?: TApiOptions) => {
  return fetch(url, options).then(checkResponse) as T;
}

export const createOrderRequest = (ingredientsId: number) =>
  fetchWithRefresh<TCreateOrderResponse>(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });

export const getOrderRequest = (orderNumber: string) =>
  request<Promise<TGetOrderResponse>>(`${BURGER_API_URL}/orders/${orderNumber}`);

export const getIngredientsRequest = () =>
  request<Promise<TGetIngredientsResponse>>(`${BURGER_API_URL}/ingredients`);

export const loginRequest = ({ email, password }: TUserRequestData) =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const registerRequest = ({ email, password, name }: TUserRequestData) =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

export const getUserRequest = () =>
  fetchWithRefresh<TAuthResponse>(`${BURGER_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });

export const updateUserRequest = (data: TUserRequestData) =>
  fetchWithRefresh<TAuthResponse>(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ...data,
    }),
  });

export const forgotPasswordRequest = (email: string) =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

export const resetPasswordRequest = ({ password, token }: TUserRequestData) =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const refreshToken = () =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

export const fetchWithRefresh = async <T>(url: string, options: TApiOptions) => {
  try {
    return await request(url, options) as T;
  } catch (err: any) {
    if (err.message === "jwt expired" || err.message === "jwt malformed") {
      const refreshData = await refreshToken() as TRefreshData;
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const accessToken = refreshData.accessToken.split("Bearer ")[1] || "";
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", accessToken);
        if (options.headers) {
            (options.headers as {[key: string]: string}).Authorization = refreshData.accessToken;
        }
      return await request(url, options) as T;
    } else {
      return Promise.reject(err);
    }
  }
};

export const logoutRequest = () =>
  request<Promise<TAuthResponse>>(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
