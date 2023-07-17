import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR
} from "../actions/auth";

const authInitialState = {
    user: null,
    registerRequest: false,
    registerError: false,
    signInRequest: false,
    signInError: false,
    getUserRequest: false,
    getUserError: false,
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordError: false,
}

export function authReducer(state = authInitialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerError: false,
                user: action.userData,
                registerRequest: false,
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                user: null,
                registerError: true,
                registerRequest: false,
            };
        }
        case SIGN_IN_REQUEST: {
            return {
                ...state,
                signInRequest: true,
            };
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                signInError: false,
                user: action.userData,
                signInRequest: false,
            };
        }
        case SIGN_IN_ERROR: {
            return {
                ...state,
                user: null,
                signInError: true,
                signInRequest: false,
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserError: false,
                user: action.userData,
                getUserRequest: false,
            };
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                user: null,
                getUserError: true,
                getUserRequest: false,
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
            };
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordError: true,
                forgotPasswordRequest: false,
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
            };
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordError: true,
                resetPasswordRequest: false,
            };
        }
        default:
            return state;
    }
}