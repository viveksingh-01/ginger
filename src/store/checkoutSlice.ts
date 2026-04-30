import type IAddress from '@/features/address/models/address';
import type ICheckoutState from '@/features/checkout/models/checkout';
import type { PaymentMethod } from '@/features/payment/models/payment-method';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ICheckoutState = {
  cartId: null,
  address: null,
  paymentMethod: 'COD',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress: (state: ICheckoutState, action: PayloadAction<IAddress>) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state: ICheckoutState, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setCart: (state: ICheckoutState, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
  },
});

export const { setAddress, setPaymentMethod, setCart } = checkoutSlice.actions;
export default checkoutSlice.reducer;
