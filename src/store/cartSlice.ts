import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IMenuItem } from '../models/menu';

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
    addItem: (state: CartState, action: PayloadAction<IMenuItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state: CartState, action: PayloadAction<IMenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
