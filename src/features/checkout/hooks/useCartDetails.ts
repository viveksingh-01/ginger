import type ICartItem from '../models/cart-item';

export function recomputeItems(items: ICartItem[]): ICartItem[] {
  return items.reduce((acc: ICartItem[], item: ICartItem) => {
    const found = acc.find(i => i.id === item.id);
    if (found) {
      found.count = (found.count ?? 0) + 1;
      found.totalPrice = (found.totalPrice ?? 0) + item.price;
    } else {
      acc.push({ ...item, count: 1, totalPrice: item.price });
    }
    return acc;
  }, []);
}

const useCartDetails = (items: ICartItem[]) => {
  const cartItems = recomputeItems(items);
  return { cartItems };
};

export default useCartDetails;
