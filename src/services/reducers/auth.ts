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
  SET_AUTH_CHECKED,
  SET_USER,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../constants/auth";
import { TAuthActions } from "../actions/auth";
import { TUserResponseData } from "../types/data";

export type TAuthState = {
  user: TUserResponseData | null;
  isAuthChecked: boolean;
  registerRequest: boolean;
  registerError: boolean;
  signInRequest: boolean;
  signInError: boolean;
  getUserRequest: boolean;
  getUserError: boolean;
  updateUserRequest: boolean;
  updateUserError: boolean;
  signOutRequest: boolean;
  signOutError: boolean;
};

const authInitialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  registerRequest: false,
  registerError: false,
  signInRequest: false,
  signInError: false,
  getUserRequest: false,
  getUserError: false,
  updateUserRequest: false,
  updateUserError: false,
  signOutRequest: false,
  signOutError: false,
};

export function authReducer(state = authInitialState, action: TAuthActions) {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
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
    case SIGN_OUT_REQUEST: {
      return {
        ...state,
        signOutRequest: true,
      };
    }
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
        signOutError: false,
        user: null,
        signOutRequest: false,
      };
    }
    case SIGN_OUT_ERROR: {
      return {
        ...state,
        user: null,
        signOutError: true,
        signOutRequest: false,
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
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserError: false,
        user: action.userData,
        updateUserRequest: false,
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        user: null,
        updateUserError: true,
        updateUserRequest: false,
      };
    }
    default:
      return state;
  }
}
