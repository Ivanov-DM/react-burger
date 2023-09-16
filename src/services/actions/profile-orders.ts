import { createAction } from "@reduxjs/toolkit";
import {
  PROFILE_ORDERS_CONNECT,
  PROFILE_ORDERS_DISCONNECT,
  PROFILE_ORDERS_WS_CLOSE,
  PROFILE_ORDERS_WS_CONNECTING,
  PROFILE_ORDERS_WS_ERROR,
  PROFILE_ORDERS_WS_MESSAGE,
  PROFILE_ORDERS_WS_OPEN,
} from "../constants/profile-orders";
import { TGetOrdersResponse } from "../types/data";

export const connectProfileOrders = createAction<
  string,
  typeof PROFILE_ORDERS_CONNECT
>(PROFILE_ORDERS_CONNECT);
export const disconnectProfileOrders = createAction(PROFILE_ORDERS_DISCONNECT);
export const wsConnectingProfileOrders = createAction(
  PROFILE_ORDERS_WS_CONNECTING
);
export const wsOpenProfileOrders = createAction(PROFILE_ORDERS_WS_OPEN);
export const wsCloseProfileOrders = createAction(PROFILE_ORDERS_WS_CLOSE);
export const wsMessageProfileOrders = createAction<
  TGetOrdersResponse,
  typeof PROFILE_ORDERS_WS_MESSAGE
>(PROFILE_ORDERS_WS_MESSAGE);
export const wsErrorProfileOrders = createAction<
  string,
  typeof PROFILE_ORDERS_WS_ERROR
>(PROFILE_ORDERS_WS_ERROR);

export type TProfileOrdersActions =
  | ReturnType<typeof connectProfileOrders>
  | ReturnType<typeof disconnectProfileOrders>
  | ReturnType<typeof wsConnectingProfileOrders>
  | ReturnType<typeof wsOpenProfileOrders>
  | ReturnType<typeof wsCloseProfileOrders>
  | ReturnType<typeof wsMessageProfileOrders>
  | ReturnType<typeof wsErrorProfileOrders>;
