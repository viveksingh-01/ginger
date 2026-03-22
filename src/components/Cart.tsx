import { useDispatch, useSelector } from 'react-redux';
import type ICartItem from '../models/cart-item';
import { addItem, removeItem } from '../store/cartSlice';
import type store from '../store/store';

const Cart = () => {
  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) return null;

  const uniqueItems = items.reduce((acc: ICartItem[], item: ICartItem) => {
    const found = acc.find((i: ICartItem) => i.id === item.id);
    if (found) {
      found.count! += 1;
      found.totalPrice! += item.price;
    } else {
      acc.push({ ...item, count: 1, totalPrice: item.price });
    }
    return acc;
  }, []);

  const cartTotal = uniqueItems.reduce((sum: number, item: ICartItem) => sum + (item.totalPrice ?? 0), 0);

  return (
    <main className="w-[480px] m-4 mx-auto p-2">
      <h1 className="mt-16 text-3xl text-gray-500">Checkout</h1>
      <section className="my-5">
        {uniqueItems.map(item => {
          const { id, name, count, totalPrice } = item;
          return (
            <>
              <article key={id} className="w-full py-2 my-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-gray">{name}</span>
                  <span className="text-lg font-semibold">&#8377;{(totalPrice || 0) / 100}</span>
                </div>
                <div className="w-[96px] px-2 flex justify-between items-center rounded-md bg-green-500 text-white shadow-md text-lg font-semibold">
                  <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => dispatch(removeItem(item))}>
                    -
                  </span>
                  <span className="p-1">{count}</span>
                  <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => dispatch(addItem(item))}>
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
