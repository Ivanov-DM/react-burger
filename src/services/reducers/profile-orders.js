import {WebsocketStatus} from "../../utils/websocket-status";
import {
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_ERROR,
    PROFILE_ORDERS_WS_MESSAGE,
    PROFILE_ORDERS_WS_OPEN
} from "../actions/profile-orders";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    ordersData: null,
    connectingError: ''
}

export const profileOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_ORDERS_WS_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case PROFILE_ORDERS_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case PROFILE_ORDERS_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case PROFILE_ORDERS_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload,
            };
        case PROFILE_ORDERS_WS_MESSAGE:
            return {
                ...state,
                ordersData: action.payload
            }
        default:
            return state;
    }
}