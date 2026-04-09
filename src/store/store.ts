import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import checkoutReducer from './checkoutSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    auth: authReducer,
  },
});

export default store;
