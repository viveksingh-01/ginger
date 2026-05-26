import { addItem, removeItem, setItems } from '@/store/cartSlice';
import { setCart } from '@/store/checkoutSlice';
import type store from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart } from '../api/cart';
import useCartDetails, { recomputeItems } from '../hooks/useCartDetails';
import type ICartItem from '../models/cart-item';
import type { ICartItems, ICartPayload } from '../models/cart-payload';
import type { ICartData } from '../models/cart-response';
import { flattenCartItems } from '../utils/cart';

const CART_STORAGE_KEY = 'ginger_guest_cart';

type Props = {
  addressId: string;
  isSignedIn: boolean;
};

const Cart = ({ addressId, isSignedIn }: Props) => {
  const [cartData, setCartData] = useState<ICartData>();
  const [isLoading, setIsLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { restaurantId, items } = useSelector((state: ReturnType<typeof store.getState>) => state.cart);
  const { cartItems } = useCartDetails(items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const { data } = await getCart();
        dispatch(setCart(data.cartMeta.cartId));
        setCartData(data);

        // Sync cart items into Redux from API response
        // Redux stores "flat" items; counts are derived by grouping.
        dispatch(setItems(flattenCartItems(data.cartDetails.items)));
      } catch {
        // If no cart exists yet (404 etc.), fall through to localStorage for guests
        if (!isSignedIn) {
          const saved = localStorage.getItem(CART_STORAGE_KEY);
          if (saved) dispatch(setItems(JSON.parse(saved)));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialCart();
  }, []); // runs once on mount

  // Takes updated items explicitly — avoids stale closure bug
  const buildPayload = (updatedItems: typeof cartItems): ICartPayload => ({
    cart: {
      restaurantId: restaurantId ? restaurantId : localStorage.getItem('restaurantId')!,
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
      setCart(data.cartMeta.cartId);
      setCartData(data);
      // Keep Redux in sync with server quantities/pricing.
      dispatch(setItems(flattenCartItems(data.cartDetails.items)));
    }, 300);
  };

  const handleIncrement = (item: ICartItem) => {
    dispatch(addItem(item));
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
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{(cartData?.cartDetails?.billDetails?.subtotal ?? 0) / 100}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery charge</span>
              <span>₹{(cartData?.cartDetails?.billDetails?.deliveryCharge ?? 0) / 100}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST</span>
              <span>₹{(cartData?.cartDetails?.billDetails?.gst ?? 0) / 100}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 my-3" />
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total</span>
              <span className="text-ginger">₹{(cartData?.cartDetails?.billDetails?.finalAmount ?? 0) / 100}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
