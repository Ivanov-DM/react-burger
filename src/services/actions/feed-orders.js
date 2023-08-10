export const FEED_ORDERS_CONNECT = "FEED_ORDERS_CONNECT";
export const FEED_ORDERS_DISCONNECT = "FEED_ORDERS_DISCONNECT";
export const FEED_ORDERS_WS_CONNECTING = "FEED_ORDERS_WS_CONNECTING";
export const FEED_ORDERS_WS_OPEN = "FEED_ORDERS_WS_OPEN";
export const FEED_ORDERS_WS_CLOSE = "FEED_ORDERS_WS_CLOSE";
export const FEED_ORDERS_WS_MESSAGE = "FEED_ORDERS_WS_MESSAGE";
export const FEED_ORDERS_WS_ERROR = "FEED_ORDERS_WS_ERROR";

export const connectFeedOrders = (url) => ({
  type: FEED_ORDERS_CONNECT,
  payload: url,
});

export const disconnectFeedOrders = () => ({
  type: FEED_ORDERS_DISCONNECT,
});
