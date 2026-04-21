import { addItem, removeItem } from '@/store/cartSlice';
import type store from '@/store/store';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../api/cart';
import useCartDetails, { recomputeItems } from '../hooks/useCartDetails';
import type ICartItem from '../models/cart-item';
import type { ICartItems, ICartPayload } from '../models/cart-payload';
import type { ICartData } from '../models/cart-response';

const CART_STORAGE_KEY = 'ginger_guest_cart';

type Props = {
  addressId: string;
  isSignedIn: boolean;
};

const Cart = ({ addressId, isSignedIn }: Props) => {
  const [cartData, setCartData] = useState<ICartData>();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { restaurantId, items } = useSelector((state: ReturnType<typeof store.getState>) => state.cart);
  const { cartItems } = useCartDetails(items);
  const dispatch = useDispatch();

  // Takes updated items explicitly — avoids stale closure bug
  const buildPayload = (updatedItems: typeof cartItems): ICartPayload => ({
    cart: {
      restaurantId,
      addressId,
      cartItems: updatedItems.map((item): ICartItems => ({ menuItemId: item.id, quantity: item.count ?? 0 })),
    },
  });

  const syncCart = (updatedItems: typeof cartItems) => {
    if (!isSignedIn) {
      // Guest: persist to localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
      return;
    }

    // Signed in: debounce API call (300ms)
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const { data } = await addToCart(buildPayload(updatedItems));
      setCartData(data);
    }, 300);
  };

  const handleIncrement = (item: ICartItem) => {
    dispatch(addItem(item));
    // cartItems here is stale — recompute after dispatch
    const next = recomputeItems([...items, item]);
    syncCart(next);
  };

  const handleDecrement = (item: ICartItem) => {
    dispatch(removeItem(item));
    const next = recomputeItems(
      items.filter((i, idx) => {
        // remove only the first match
        if (i.id === item.id) {
          return idx !== items.findIndex(x => x.id === item.id);
        }
        return true;
      })
    );
    syncCart(next);
  };

  return (
    <section className="lg:col-span-2">
      <div className="bg-white shadow-sm p-6 mb-4">
        <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">YOUR CART</h2>
        <div className="divide-y divide-gray-100">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex-1 pr-3 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">₹{item.price / 100}</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shrink-0">
                <button
                  onClick={() => handleDecrement(item)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
                >
                  −
                </button>
                <span className="px-3 text-ginger font-medium min-w-[24px] text-center">{item.count}</span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="px-3 py-1 text-ginger hover:bg-gray-100 active:scale-95 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-300 my-3" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{(cartData?.cartDetails.billDetails.subtotal ?? 0) / 100}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%)</span>
            <span>₹{(cartData?.cartDetails.billDetails.GST ?? 0) / 100}</span>
          </div>
          <div className="border-t border-dashed border-gray-300 my-3" />
          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total</span>
            <span className="text-ginger">₹{(cartData?.cartDetails.billDetails.finalAmount ?? 0) / 100}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
