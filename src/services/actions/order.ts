import { createOrderRequest, getOrderRequest } from "../../utils/burger-api";
import { resetIngredientAction } from "./burger-constructor";
import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../constants/order";
import { TOrderData } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

interface ICreateOrderAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  createdOrder: TOrderData;
}

interface ICreateOrderErrorAction {
  readonly type: typeof CREATE_ORDER_ERROR;
}

interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  orderByNumber: TOrderData;
}

interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR;
}

export type TOrderActions =
  | ICreateOrderAction
  | ICreateOrderSuccessAction
  | ICreateOrderErrorAction
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction;

export const createOrderAction = (): ICreateOrderAction => ({
  type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccessAction = (
  createdOrder: TOrderData
): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  createdOrder,
});

export const createOrderErrorAction = (): ICreateOrderErrorAction => ({
  type: CREATE_ORDER_ERROR,
});

export const getOrderAction = (): IGetOrderAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccessAction = (
  orderByNumber: TOrderData
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  orderByNumber,
});

export const getOrderErrorAction = (): IGetOrderErrorAction => ({
  type: GET_ORDER_ERROR,
});

export const createOrder: AppThunk =
  (ingredientsId: number) => (dispatch: AppDispatch) => {
    dispatch(createOrderAction());
    createOrderRequest(ingredientsId)
      .then((res) => {
        if (res && res.success) {
          dispatch(createOrderSuccessAction(res.order));
          dispatch(resetIngredientAction());
        } else {
          dispatch(createOrderErrorAction());
        }
      })
      .catch(() => {
        dispatch(createOrderErrorAction());
        dispatch(resetIngredientAction());
      });
  };

export const getOrder: AppThunk = (orderNumber) => (dispatch: AppDispatch) => {
  dispatch(getOrderAction());
  getOrderRequest(orderNumber)
    .then((res) => {
      if (res && res.success) {
        dispatch(getOrderSuccessAction(res.orders[0]));
      } else {
        dispatch(getOrderErrorAction());
      }
    })
    .catch(() => {
      dispatch(getOrderErrorAction());
    });
};
