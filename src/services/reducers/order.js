import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../actions/order";

const orderInitialState = {
  order: null,
  orderDetails: null,
  orderRequest: false,
  orderError: false,
  orderSuccess: false,
  getOrderRequest: false,
  getOrderError: false,
  getOrderSuccess: false,
};

export const orderReducer = (state = orderInitialState, action) => {
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
        orderDetails: action.orderDetails,
        orderError: false,
        orderSuccess: true,
      };
    }
    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        orderDetails: null,
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
        order: action.payload,
        getOrderError: false,
        getOrderSuccess: true,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        order: null,
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
