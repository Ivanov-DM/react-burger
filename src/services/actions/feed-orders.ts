import { createAction } from "@reduxjs/toolkit";
import {
  FEED_ORDERS_CONNECT,
  FEED_ORDERS_DISCONNECT,
  FEED_ORDERS_WS_CLOSE,
  FEED_ORDERS_WS_CONNECTING,
  FEED_ORDERS_WS_ERROR,
  FEED_ORDERS_WS_MESSAGE,
  FEED_ORDERS_WS_OPEN,
} from "../constants/feed-orders";
import { TGetOrdersResponse, TOrderData } from "../types/data";

export const connectFeedOrders = createAction<
  string,
  typeof FEED_ORDERS_CONNECT
>(FEED_ORDERS_CONNECT);
export const disconnectFeedOrders = createAction(FEED_ORDERS_DISCONNECT);
export const wsConnectingFeedOrders = createAction(FEED_ORDERS_WS_CONNECTING);
export const wsOpenFeedOrders = createAction(FEED_ORDERS_WS_OPEN);
export const wsCloseFeedOrders = createAction(FEED_ORDERS_WS_CLOSE);
export const wsMessageFeedOrders = createAction<
  TGetOrdersResponse,
  typeof FEED_ORDERS_WS_MESSAGE
>(FEED_ORDERS_WS_MESSAGE);
export const wsErrorFeedOrders = createAction<
  string,
  typeof FEED_ORDERS_WS_ERROR
>(FEED_ORDERS_WS_ERROR);

export type TFeedOrdersActions =
  | ReturnType<typeof connectFeedOrders>
  | ReturnType<typeof disconnectFeedOrders>
  | ReturnType<typeof wsConnectingFeedOrders>
  | ReturnType<typeof wsOpenFeedOrders>
  | ReturnType<typeof wsCloseFeedOrders>
  | ReturnType<typeof wsMessageFeedOrders>
  | ReturnType<typeof wsErrorFeedOrders>;
