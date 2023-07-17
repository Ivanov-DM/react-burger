import {
    getIngredientsRequest,
    getUserRequest,
    loginRequest,
    registerRequest,
    forgotPasswordRequest, resetPasswordRequest, logoutRequest
} from "../../utils/burger-api";
import {getCookie, setCookie} from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export function registerUser(userData) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        });
        registerRequest(userData)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        userData: res.data,
                    });
                } else {
                    dispatch({
                        type: REGISTER_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_ERROR,
                });
            });
    };
}

export function getUser() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        });
        getUserRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        userData: res.user,
                    });
                } else {
                    dispatch({
                        type: GET_USER_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: GET_USER_ERROR,
                });
            });
    };
}

export function signIn(userData) {
    return function (dispatch) {
        dispatch({
            type: SIGN_IN_REQUEST,
        });
        loginRequest(userData)
            .then((res) => {
                if (res && res.success) {
                    const accessToken = res.accessToken.split('Bearer ')[1] || '';
                    const refreshToken = res.refreshToken;
                    if (accessToken && refreshToken) {
                        setCookie('accessToken', accessToken);
                        setCookie('refreshToken', refreshToken);
                    }
                    dispatch({
                        type: SIGN_IN_SUCCESS,
                        userData: res.user,
                    });
                } else {
                    dispatch({
                        type: SIGN_IN_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: SIGN_IN_ERROR,
                });
            });
    };
}

export function signOut() {
    return function (dispatch) {
        dispatch({
            type: SIGN_OUT_REQUEST,
        });
        logoutRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: SIGN_OUT_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: SIGN_OUT_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: SIGN_OUT_ERROR,
                });
            });
    };
}

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });
        forgotPasswordRequest(email)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                });
            });
    };
}

export function resetPassword(passwordData) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        resetPasswordRequest(passwordData)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: RESET_PASSWORD_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                });
            });
    };
}