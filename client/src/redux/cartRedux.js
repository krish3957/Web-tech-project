import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        discount: false,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            console.log(action.payload);
            if (localStorage.getItem('coupon') === 'true') {
                state.total += action.payload.price * action.payload.quantity;
            }
            state.total -= action.payload.price * action.payload.quantity;
            state.quantity -= 1;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
            );
        }
        ,
        clearCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
            state.discount = false;
        },
        applyDiscount: (state) => {
            state.discount = true;
            state.total -= 150;
        },
    }
})

export const { addProduct, removeProduct, clearCart,applyDiscount } = cartSlice.actions

export default cartSlice.reducer;