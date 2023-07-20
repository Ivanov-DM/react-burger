import {
    getUserRequest,
    loginRequest,
    registerRequest,
    logoutRequest,
    updateUserRequest
} from "../../utils/burger-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

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
        return getUserRequest()
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

export const checkUserAuth = () => {
    return (dispatch) => {
        if (getCookie('accessToken')) {
            dispatch(getUser())
                .catch(() => {
                    deleteCookie('accessToken');
                    deleteCookie('refreshToken');
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export function updateUser(data) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });
        return updateUserRequest(data)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        userData: res.user,
                    });
                } else {
                    dispatch({
                        type: UPDATE_USER_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_USER_ERROR,
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
                    dispatch(setAuthChecked(true));
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
                    deleteCookie('accessToken');
                    deleteCookie('refreshToken');
                    dispatch({
                        type: SIGN_OUT_SUCCESS,
                    });
                    dispatch(setUser(null));
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