import {createOrderRequest, getOrderRequest} from "../../utils/burger-api";
import { RESET_INGREDIENTS } from "./burger-constructor";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

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

export function getOrder(orderNumber) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(orderNumber)
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_ORDER_SUCCESS,
              payload: res.orders[0],
            });
          } else {
            dispatch({
              type: GET_ORDER_ERROR,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: GET_ORDER_ERROR,
          });
        });
  };
}
