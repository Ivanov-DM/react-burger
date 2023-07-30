import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
} from "../actions/order-details";

const orderInitialState = {
  orderDetails: null,
  orderRequest: false,
  orderError: false,
  orderSuccess: false,
};

export const orderDetailsReducer = (state = orderInitialState, action) => {
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
    default: {
      return state;
    }
  }
};
