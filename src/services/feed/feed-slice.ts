import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

type FeedStore = TFeedResponse & {
    status: WebsocketStatus;
    connectionError: string | null;
};

export const initialState: FeedStore = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null,
    total: 0,
    totalToday: 0,
};

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
    selectors: {
        getFeed: state => state.orders,
        getWebsocketStatus: state => state.status,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedSlice.actions;
export const {getFeed, getWebsocketStatus} = feedSlice.selectors;