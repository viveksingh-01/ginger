import type ICartItem from '@/features/checkout/models/cart-item';
import type { IMenuItem } from '@/features/menu/models/menu';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  restaurantId: string;
  items: IMenuItem[];
};

const initialState: CartState = {
  restaurantId: '',
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
    setRestaurant: (state: CartState, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
    },
  },
});

export const { addItem, removeItem, setRestaurant } = cartSlice.actions;
export default cartSlice.reducer;
