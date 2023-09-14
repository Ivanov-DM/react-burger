import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  connectProfileOrders,
  disconnectProfileOrders,
  wsCloseProfileOrders,
  wsConnectingProfileOrders,
  wsErrorProfileOrders,
  wsMessageProfileOrders,
  wsOpenProfileOrders,
} from "./actions/profile-orders";
import {
  connectFeedOrders,
  disconnectFeedOrders,
  wsCloseFeedOrders,
  wsConnectingFeedOrders, wsErrorFeedOrders, wsMessageFeedOrders,
  wsOpenFeedOrders
} from "./actions/feed-orders";

const feedOrdersMiddleware = socketMiddleware({
  wsConnect: connectFeedOrders,
  wsDisconnect: disconnectFeedOrders,
  wsConnecting: wsConnectingFeedOrders,
  onOpen: wsOpenFeedOrders,
  onClose: wsCloseFeedOrders,
  onError: wsErrorFeedOrders,
  onMessage: wsMessageFeedOrders,
});

const profileOrdersMiddleware = socketMiddleware({
  wsConnect: connectProfileOrders,
  wsDisconnect: disconnectProfileOrders,
  wsConnecting: wsConnectingProfileOrders,
  onOpen: wsOpenProfileOrders,
  onClose: wsCloseProfileOrders,
  onError: wsErrorProfileOrders,
  onMessage: wsMessageProfileOrders,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      feedOrdersMiddleware,
      profileOrdersMiddleware
    );
  },
  devTools: process.env.NODE_ENV !== "production",
});
