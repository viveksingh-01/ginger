import type ICartItem from '../models/cart-item';

const useCartDetails = (items: ICartItem[]) => {
  const uniqueItems = items.reduce((acc: ICartItem[], item: ICartItem) => {
    const found = acc.find(i => i.id == item.id);
    if (found) {
      found.count = (found.count ?? 0) + 1;
      found.totalPrice = (found.totalPrice ?? 0) + item.price;
    } else {
      acc.push({ ...item, count: 1, totalPrice: item.price });
    }
    return acc;
  }, []);

  const total = uniqueItems.reduce((sum: number, item: ICartItem) => sum + (item.totalPrice ?? 0), 0);

  return {
    cartItems: uniqueItems,
    cartTotal: total,
  };
};

export default useCartDetails;
