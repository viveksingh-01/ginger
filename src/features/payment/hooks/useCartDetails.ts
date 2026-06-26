import type store from '@/store/store';
import { useSelector } from 'react-redux';

export const useCartDetails = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);

  return {
    count: cartItems.length,
  };
};
