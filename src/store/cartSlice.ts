import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
});

export default cartSlice.reducer;
