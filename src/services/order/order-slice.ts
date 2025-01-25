import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createOrder, loadOrderDetail} from "./order-actions.ts";

interface OrderState {
    createdOrderNumber: number | null;
    order: TOrder | null;
    status: TStatus;
    error: string | undefined | null;
}

export const initialState: OrderState = {
    createdOrderNumber: null,
    order: null,
    status: 'idle',
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: (state): void => {
            state.createdOrderNumber = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<TCreateOrderResponse>) => {
                state.status = 'succeeded';
                state.createdOrderNumber = action.payload.order.number;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.createdOrderNumber = null;
            })
            .addCase(loadOrderDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrderDetail.fulfilled, (state, action: PayloadAction<TOrderDetailResponse>) => {
                state.status = 'succeeded';
                state.order = action.payload.orders[0];
            })
            .addCase(loadOrderDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.order = null;
            });
    },
});

export const {clearOrder} = orderSlice.actions;
export default orderSlice;
