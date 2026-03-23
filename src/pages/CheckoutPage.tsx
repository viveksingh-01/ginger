import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT_LABELS } from '../constants/payment-method';
import useCartDetails from '../hooks/useCartDetails';
import { addItem, removeItem } from '../store/cartSlice';
import type store from '../store/store';

const CheckoutPage = () => {
  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const dispatch = useDispatch();
  const { cartItems } = useCartDetails(items);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        <h1 className="mb-4 font-medium text-gray-800 uppercase tracking-wide">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="p-6 bg-white shadow-sm">
              <h2 className="font-medium text-gray-500 mb-4">Delivery Address</h2>
              <div className="py-4 px-6 bg-gray-50 space-y-1 text-sm text-gray-700">
                <p className="text-lg font-medium text-gray-900">Home</p>
                <p>A-123, Signature Apartments,</p>
                <p>Electronic City Phase-1,</p>
                <p>Bangalore, Karnataka - 560100</p>
              </div>
            </div>
            {/* PAYMENT (UPDATED) */}
            <div className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-500">Payment Method</h2>
              </div>

              {/* SELECTED METHOD DISPLAY */}
              <div className="py-4 px-6 bg-gray-50 text-sm text-gray-800 font-medium">{PAYMENT_LABELS['COD']}</div>
            </div>
          </div>
          {/* ================= RIGHT SIDE (RECEIPT) ================= */}
          {/* TO-DO: Display Cart section with final amount */}
          <div className="bg-white shadow-sm p-6 mb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">YOUR CART</h2>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {cartItems.map(item => (
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
