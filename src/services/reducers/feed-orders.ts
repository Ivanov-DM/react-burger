import {TGetOrdersResponse, WebsocketStatus} from "../types/data";
import {
  wsCloseFeedOrders,
  wsConnectingFeedOrders,
  wsErrorFeedOrders, wsMessageFeedOrders,
  wsOpenFeedOrders
} from "../actions/feed-orders";
import {createReducer} from "@reduxjs/toolkit";

export type TFeedOrdersState = {
  status: WebsocketStatus,
  ordersData: TGetOrdersResponse | null;
  connectingError: string;
}

const initialState: TFeedOrdersState = {
  status: WebsocketStatus.OFFLINE,
  ordersData: null,
  connectingError: "",
};

export const feedOrdersReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(wsConnectingFeedOrders, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpenFeedOrders, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = "";
      })
      .addCase(wsCloseFeedOrders, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorFeedOrders, (state, action) => {
        state.connectingError = action.payload;
      })
      .addCase(wsMessageFeedOrders, (state, action) => {
        state.ordersData = action.payload;
      });
});