import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type ICartItem from '../models/cart-item';
import { addItem, removeItem } from '../store/cartSlice';
import type store from '../store/store';

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    populateCartItemsList();
  }, [items]);

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

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

  const incrementItemCount = (cartItem: ICartItem) => {
    const menuItem = items.find(item => item.id === cartItem.id);
    if (menuItem) {
      dispatch(addItem(menuItem));
    }
  };

  const decrementItemCount = (cartItem: ICartItem) => {
    const menuItem = items.find(item => item.id === cartItem.id);
    if (menuItem) {
      dispatch(removeItem(menuItem));
    }
  };

  const calculateCartTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.totalPrice || 0;
    }
    setCartTotal(total);
  };

  if (items.length === 0) return null;
  return (
    <main className="w-[480px] m-4 mx-auto p-2">
      <h1 className="mt-16 text-3xl text-gray-500">Checkout</h1>
      <section className="my-5">
        {cartItems.map(item => {
          const { id, name, count, totalPrice } = item;
          return (
            <>
              <article key={id} className="w-full py-2 my-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-gray">{name}</span>
                  <span className="text-lg font-semibold">&#8377;{(totalPrice || 0) / 100}</span>
                </div>
                <div className="w-[96px] px-2 flex justify-between items-center rounded-md bg-green-500 text-white shadow-md text-lg font-semibold">
                  <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => decrementItemCount(item)}>
                    -
                  </span>
                  <span className="p-1">{count}</span>
                  <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => incrementItemCount(item)}>
                    +
                  </span>
                </div>
              </article>
              <hr className="text-gray-300" />
            </>
          );
        })}
      </section>
      <section className="flex justify-between">
        <span className="text-md">Item Total</span>
        <span className="font-semibold text-2xl">₹{cartTotal / 100}</span>
      </section>
    </main>
  );
};

export default Cart;
