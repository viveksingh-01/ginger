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
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
