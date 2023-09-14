import {getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest,} from "../../utils/burger-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";

import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../constants/auth";
import {TUserResponseData} from "../types/data";
import {AppDispatch, AppThunk} from "../types";

interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}

interface ISetUserAction {
  readonly type: typeof SET_USER;
  payload: TUserResponseData | null;
}

interface IRegisterUserAction {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  userData: TUserResponseData;
}

interface IRegisterUserErrorAction {
  readonly type: typeof REGISTER_ERROR;
}

interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  userData: TUserResponseData;
}

interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR;
}

interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  userData: TUserResponseData;
}

interface IUpdateUserErrorAction {
  readonly type: typeof UPDATE_USER_ERROR;
}

interface ISignInUserAction {
  readonly type: typeof SIGN_IN_REQUEST;
}

interface ISignInUserSuccessAction {
  readonly type: typeof SIGN_IN_SUCCESS;
  userData: TUserResponseData;
}

interface ISignInUserErrorAction {
  readonly type: typeof SIGN_IN_ERROR;
}

interface ISignOutUserAction {
  readonly type: typeof SIGN_OUT_REQUEST;
}

interface ISignOutUserSuccessAction {
  readonly type: typeof SIGN_OUT_SUCCESS;
}

interface ISignOutUserErrorAction {
  readonly type: typeof SIGN_OUT_ERROR;
}

export type TAuthActions =
    ISetAuthCheckedAction
    | ISetUserAction
    | IRegisterUserAction
    | IRegisterUserSuccessAction
    | IRegisterUserErrorAction
    | IGetUserAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IUpdateUserAction
    | IUpdateUserSuccessAction
    | IUpdateUserErrorAction
    | ISignInUserAction
    | ISignInUserSuccessAction
    | ISignInUserErrorAction
    | ISignOutUserAction
    | ISignOutUserSuccessAction
    | ISignOutUserErrorAction;

export const setAuthCheckedAction = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUserAction = (user: TUserResponseData | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const registerUserAction = (): IRegisterUserAction => ({
  type: REGISTER_REQUEST
});

export const registerUserSuccessAction = (userData: TUserResponseData): IRegisterUserSuccessAction => ({
  type: REGISTER_SUCCESS,
  userData
});

export const registerUserErrorAction = (): IRegisterUserErrorAction => ({
  type: REGISTER_ERROR,
});

export const getUserAction = (): IGetUserAction => ({
  type: GET_USER_REQUEST
});

export const getUserSuccessAction = (userData: TUserResponseData): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  userData
});

export const getUserErrorAction = (): IGetUserErrorAction => ({
  type: GET_USER_ERROR,
});

export const updateUserAction = (): IUpdateUserAction => ({
  type: UPDATE_USER_REQUEST
});

export const updateUserSuccessAction = (userData: TUserResponseData): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  userData
});

export const updateUserErrorAction = (): IUpdateUserErrorAction => ({
  type: UPDATE_USER_ERROR,
});

export const sighInUserAction = (): ISignInUserAction => ({
  type: SIGN_IN_REQUEST
});

export const sighInUserSuccessAction = (userData: TUserResponseData): ISignInUserSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  userData
});

export const sighInUserErrorAction = (): ISignInUserErrorAction => ({
  type: SIGN_IN_ERROR,
});

export const sighOutUserAction = (): ISignOutUserAction => ({
  type: SIGN_OUT_REQUEST
});

export const sighOutUserSuccessAction = (): ISignOutUserSuccessAction => ({
  type: SIGN_OUT_SUCCESS
});

export const sighOutUserErrorAction = (): ISignOutUserErrorAction => ({
  type: SIGN_OUT_ERROR,
});

export const registerUser: AppThunk = (userData) => (dispatch: AppDispatch) => {
  dispatch(registerUserAction());
  registerRequest(userData)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerUserSuccessAction(res.user as TUserResponseData));
        } else {
          dispatch(registerUserErrorAction());
        }
      })
      .catch(() => {
        dispatch(registerUserErrorAction());
      });
}

export const getUser: AppThunk<Promise<unknown>> = () => (dispatch: AppDispatch) => {
  dispatch(getUserAction());
  return getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserSuccessAction(res.user as TUserResponseData));
        } else {
          dispatch(getUserErrorAction());
        }
      })
      .catch(() => {
        dispatch(getUserErrorAction());
      });
}

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser())
        .catch(() => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(setUserAction(null));
        })
        .finally(() => dispatch(setAuthCheckedAction(true)));
  } else {
    dispatch(setAuthCheckedAction(true));
  }
};

export const updateUser: AppThunk = (data) => (dispatch: AppDispatch) =>  {
  dispatch(updateUserAction());
  return updateUserRequest(data)
      .then((res) => {
        if (res && res.success) {
          dispatch(updateUserSuccessAction(res.user as TUserResponseData));
        } else {
          dispatch(updateUserErrorAction());
        }
      })
      .catch(() => {
        dispatch(updateUserErrorAction());
      });
}

export const signIn: AppThunk = (userData) => (dispatch: AppDispatch) => {
  dispatch(sighInUserAction());
  loginRequest(userData)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken!.split("Bearer ")[1] || "";
          const refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
          }
          dispatch(sighInUserSuccessAction(res.user as TUserResponseData));
          dispatch(setAuthCheckedAction(true));
        } else {
          dispatch(sighInUserErrorAction());
        }
      })
      .catch(() => {
        dispatch(sighInUserErrorAction());
      });
}

export const signOut: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(sighOutUserAction());
  logoutRequest()
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(sighOutUserSuccessAction());
          dispatch(setUserAction(null));
        } else {
          dispatch(sighOutUserErrorAction());
        }
      })
      .catch(() => {
        dispatch(sighOutUserErrorAction());
      });
}