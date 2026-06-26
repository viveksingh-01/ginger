import type store from '@/store/store';
import { useSelector } from 'react-redux';

export const useCartDetails = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  let totalAmount = 0;

  for (const { finalPrice } of cartItems) {
    totalAmount += finalPrice / 100;
  }

  return {
    count: cartItems.length,
    totalAmount,
  };
};
