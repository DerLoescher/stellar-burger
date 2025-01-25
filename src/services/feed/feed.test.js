import { feedSlice, initialState, WebsocketStatus, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './feed-slice.ts';


const feedSliceReducer = feedSlice.reducer;

describe('feedSlice', () => {
    it('should handle wsConnecting', () => {
        const nextState = feedSliceReducer(initialState, wsConnecting());
        expect(nextState.status).toBe(WebsocketStatus.CONNECTING);
    });

    it('should handle wsOpen', () => {
        const nextState = feedSliceReducer(initialState, wsOpen());
        expect(nextState.status).toBe(WebsocketStatus.ONLINE);
        expect(nextState.connectionError).toBeNull();
    });

    it('should handle wsClose', () => {
        const nextState = feedSliceReducer(initialState, wsClose());
        expect(nextState.status).toBe(WebsocketStatus.OFFLINE);
    });

    it('should handle wsError', () => {
        const errorMessage = 'Ошибка подключения';
        const nextState = feedSliceReducer(initialState, wsError(errorMessage));
        expect(nextState.connectionError).toBe(errorMessage);
    });

    it('should handle wsMessage', () => {
        const payload = {
            orders: [{ id: 1, name: 'Флюоресцентный бургер' }],
            total: 100,
            totalToday: 10,
        };
        const nextState = feedSliceReducer(initialState, wsMessage(payload));
        expect(nextState.orders).toEqual(payload.orders);
        expect(nextState.total).toBe(payload.total);
        expect(nextState.totalToday).toBe(payload.totalToday);
    });
});