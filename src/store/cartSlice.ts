import type ICartItem from '@/features/checkout/models/cart-item';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  restaurantId: string;
  items: ICartItem[];
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

    // needed for initial load + rollback
    setItems: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
    },

    setRestaurant: (state: CartState, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
      localStorage.setItem('restaurantId', action.payload);
    },
  },
});

export const { addItem, removeItem, setItems, setRestaurant } = cartSlice.actions;
export default cartSlice.reducer;
