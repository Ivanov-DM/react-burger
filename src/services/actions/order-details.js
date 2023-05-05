import { createOrderRequest } from "../../utils/burger-api";
import { RESET_INGREDIENTS } from "./burger-constructor";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";

export function createOrder(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    createOrderRequest(ingredientsId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            orderDetails: res.order,
          });
          dispatch({ type: RESET_INGREDIENTS });
        } else {
          dispatch({
            type: CREATE_ORDER_ERROR,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: CREATE_ORDER_ERROR,
        });
        dispatch({ type: RESET_INGREDIENTS });
      });
  };
}
