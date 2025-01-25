import orderSlice, {clearOrder, initialState} from './order-slice.ts';
import {createOrder, loadOrderDetail} from "./order-actions.ts";

const orderSliceReducer = orderSlice.reducer;

describe('orderSlice', () => {
    it('should handle clearOrder', () => {
        const stateWithOrder = {
            createdOrderNumber: 123,
            error: 'Ошибка',
        };

        const nextState = orderSliceReducer(stateWithOrder, clearOrder());
        expect(nextState.createdOrderNumber).toBeNull();
        expect(nextState.error).toBeNull();
    });

    it('should handle createOrder.pending', () => {
        const nextState = orderSliceReducer(initialState, createOrder.pending());
        expect(nextState.status).toBe('loading');
        expect(nextState.error).toBeNull();
    });

    it('should handle createOrder.fulfilled', () => {
        const mockResponse = {order: {number: 456}};
        const nextState = orderSliceReducer(initialState, createOrder.fulfilled(mockResponse));
        expect(nextState.status).toBe('succeeded');
        expect(nextState.createdOrderNumber).toBe(456);
    });

    it('should handle createOrder.rejected', () => {
        const errorMessage = 'Ошибка создания заказа';
        const nextState = orderSliceReducer(initialState, createOrder.rejected({message: errorMessage}));
        expect(nextState.status).toBe('failed');
        expect(nextState.error).toBe(errorMessage);
        expect(nextState.createdOrderNumber).toBeNull();
    });

    it('should handle loadOrderDetail.pending', () => {
        const nextState = orderSliceReducer(initialState, loadOrderDetail.pending());
        expect(nextState.status).toBe('loading');
        expect(nextState.error).toBeNull();
    });

    it('should handle loadOrderDetail.fulfilled', () => {
        const mockOrderDetailResponse = {orders: [{name: "Флюоресцентный бургер", number: 66762}]};
        const nextState = orderSliceReducer(initialState, loadOrderDetail.fulfilled(mockOrderDetailResponse));
        expect(nextState.status).toBe('succeeded');
        expect(nextState.order).toEqual(mockOrderDetailResponse.orders[0]);
    });

    it('should handle loadOrderDetail.rejected', () => {
        const errorMessage = 'Не удалось загрузить информацию о заказе';
        const nextState = orderSliceReducer(initialState, loadOrderDetail.rejected({message: errorMessage}));
        expect(nextState.status).toBe('failed');
        expect(nextState.error).toBe(errorMessage);
        expect(nextState.order).toBeNull();
    });
});