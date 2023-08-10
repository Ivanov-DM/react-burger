import {
    FEED_ORDERS_WS_CLOSE,
    FEED_ORDERS_WS_CONNECTING,
    FEED_ORDERS_WS_ERROR,
    FEED_ORDERS_WS_MESSAGE,
    FEED_ORDERS_WS_OPEN,
} from "../actions/feed-orders";
import {WebsocketStatus} from "../../utils/websocket-status";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    ordersData: null,
    connectingError: ''
}

export const feedOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_ORDERS_WS_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case FEED_ORDERS_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case FEED_ORDERS_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case FEED_ORDERS_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload,
            };
        case FEED_ORDERS_WS_MESSAGE:
            return {
                ...state,
                ordersData: action.payload
            }
        default:
            return state;
    }
}