import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    FEED_ORDERS_CONNECT,
    FEED_ORDERS_DISCONNECT,
    FEED_ORDERS_WS_CLOSE,
    FEED_ORDERS_WS_CONNECTING,
    FEED_ORDERS_WS_ERROR,
    FEED_ORDERS_WS_MESSAGE,
    FEED_ORDERS_WS_OPEN
} from "./actions/feed-orders";
import {
    PROFILE_ORDERS_CONNECT,
    PROFILE_ORDERS_DISCONNECT,
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_ERROR,
    PROFILE_ORDERS_WS_MESSAGE,
    PROFILE_ORDERS_WS_OPEN
} from "./actions/profile-orders";

const feedOrdersMiddleware = socketMiddleware({
    wsConnect: FEED_ORDERS_CONNECT,
    wsDisconnect: FEED_ORDERS_DISCONNECT,
    wsConnecting: FEED_ORDERS_WS_CONNECTING,
    onOpen: FEED_ORDERS_WS_OPEN,
    onClose: FEED_ORDERS_WS_CLOSE,
    onError: FEED_ORDERS_WS_ERROR,
    onMessage: FEED_ORDERS_WS_MESSAGE
});

const profileOrdersMiddleware = socketMiddleware({
    wsConnect: PROFILE_ORDERS_CONNECT,
    wsDisconnect: PROFILE_ORDERS_DISCONNECT,
    wsConnecting: PROFILE_ORDERS_WS_CONNECTING,
    onOpen: PROFILE_ORDERS_WS_OPEN,
    onClose: PROFILE_ORDERS_WS_CLOSE,
    onError: PROFILE_ORDERS_WS_ERROR,
    onMessage: PROFILE_ORDERS_WS_MESSAGE
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedOrdersMiddleware, profileOrdersMiddleware);
    },
    devTools: process.env.NODE_ENV !== 'production',
});