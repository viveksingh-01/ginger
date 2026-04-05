import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type IAddress from '../address/models/address';
import type ICheckoutState from '../features/checkout/models/checkout';
import type { PaymentMethod } from '../features/payment/models/payment-method';

const initialState: ICheckoutState = {
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
  },
});

export const { setAddress, setPaymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
