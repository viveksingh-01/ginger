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
    <div className="max-w-md mt-24 mx-auto pb-24 px-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-600 py-4">Your cart</h1>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {uniqueItems.map(item => (
          <div key={item.id} className="flex items-center justify-between py-4">
            {/* Left */}
            <div className="flex-1 pr-3 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-sm text-gray-600 mt-1">₹{item.price / 100}</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shrink-0">
              <button
                onClick={() => dispatch(removeItem(item))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
              >
                -
              </button>
              <span className="px-3 text-ginger font-medium min-w-[24px] text-center">{item.count}</span>
              <button
                onClick={() => dispatch(addItem(item))}
                className="px-3 py-1 text-ginger hover:bg-gray-100 active:scale-95 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
        <div className="px-4 max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-ginger">Item Total</p>
            <p className="text-xl font-semibold text-gray-900">₹{cartTotal / 100}</p>
          </div>

          <button className="px-8 py-2 bg-green-600 text-white rounded-sm font-medium hover:bg-green-700 cursor-pointer transition">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
