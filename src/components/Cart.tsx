import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type ICartItem from '../models/cart-item';
import type store from '../store/store';

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);

  useEffect(() => {
    populateCartItemsList();
  }, [items]);

  const populateCartItemsList = () => {
    const itemsList: ICartItem[] = [];
    for (const item of items) {
      itemsList.push({ ...item, totalPrice: item.finalPrice });
    }
    const uniqueItems = getUniqueItems(itemsList);
    for (const item of uniqueItems) {
      item.count = itemsList.filter(el => el.id === item.id).length;
      item.totalPrice = item.price * item.count;
    }
    setCartItems(uniqueItems);
  };

  const getUniqueItems = (itemsList: ICartItem[]) => {
    return Array.from(new Map(itemsList.map(item => [item.id, item])).values());
  };

  if (items.length === 0) return null;
  return (
    <main className="w-[560px] m-4 mx-auto p-2">
      <h1 className="text-3xl">Cart</h1>
      <section className="my-5">
        {cartItems.map(item => {
          const { id, name, count } = item;
          return (
            <article
              key={id}
              className="w-100 p-2 px-3 mb-3 bg-gray-100 rounded-md flex justify-between items-center shadow-sm"
            >
              <span className="text-gray">{name}</span>
              <span className="p-1">{count}</span>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default Cart;
