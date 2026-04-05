import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type ICartItem from '../features/checkout/models/cart-item';
import type { IMenuItem } from '../features/menu/models/menu';

type CartState = {
  items: IMenuItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<ICartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state: CartState, action: PayloadAction<ICartItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
