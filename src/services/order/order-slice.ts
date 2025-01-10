import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createOrder} from "./order-actions.ts";

interface OrderState {
    createdOrder: number | null;
    status: TStatus;
    error: string | undefined | null;
}

const initialState: OrderState = {
    createdOrder: null,
    status: 'idle',
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.createdOrder = null;
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrderResponse>) => {
                state.status = 'succeeded';
                state.createdOrder = action.payload.order.number;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.createdOrder = null;
            });
    },
});

export const {clearOrder} = orderSlice.actions;
export default orderSlice;
