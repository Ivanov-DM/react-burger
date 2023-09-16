import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../constants/order";
import { TOrderData } from "../types/data";
import { TOrderActions } from "../actions/order";

const orderInitialState: TOrderState = {
  orderByNumber: null,
  createdOrder: null,
  orderRequest: false,
  orderError: false,
  orderSuccess: false,
  getOrderRequest: false,
  getOrderError: false,
  getOrderSuccess: false,
};

export type TOrderState = {
  orderByNumber: TOrderData | null;
  createdOrder: TOrderData | null;
  orderRequest: boolean;
  orderError: boolean;
  orderSuccess: boolean;
  getOrderRequest: boolean;
  getOrderError: boolean;
  getOrderSuccess: boolean;
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderActions
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderSuccess: false,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        createdOrder: action.createdOrder,
        orderError: false,
        orderSuccess: true,
      };
    }
    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        createdOrder: null,
        orderRequest: false,
        orderError: true,
        orderSuccess: false,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        getOrderRequest: true,
        getOrderSuccess: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        getOrderRequest: false,
        orderByNumber: action.orderByNumber,
        getOrderError: false,
        getOrderSuccess: true,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderByNumber: null,
        getOrderRequest: false,
        getOrderError: true,
        getOrderSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
