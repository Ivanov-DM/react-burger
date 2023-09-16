import {TGetOrdersResponse, WebsocketStatus} from "../types/data";
import {
  wsCloseProfileOrders,
  wsConnectingProfileOrders,
  wsErrorProfileOrders,
  wsOpenProfileOrders,
  wsMessageProfileOrders
} from "../actions/profile-orders";
import {createReducer} from "@reduxjs/toolkit";

export type TProfileOrdersState = {
  status: WebsocketStatus,
  ordersData: TGetOrdersResponse | null;
  connectingError: string;
}

const initialState: TProfileOrdersState = {
  status: WebsocketStatus.OFFLINE,
  ordersData: null,
  connectingError: "",
};

export const profileOrdersReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(wsConnectingProfileOrders, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpenProfileOrders, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = "";
      })
      .addCase(wsCloseProfileOrders, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorProfileOrders, (state, action) => {
        state.connectingError = action.payload;
      })
      .addCase(wsMessageProfileOrders, (state, action) => {
        state.ordersData = action.payload;
      });
});