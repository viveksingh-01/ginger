import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCartDetails from '../hooks/useCartDetails';
import { addItem, removeItem } from '../store/cartSlice';
import type store from '../store/store';

const CheckoutPage = () => {
  const address = useSelector((state: ReturnType<typeof store.getState>) => state.checkout.address);
  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems, cartTotal, taxes, total } = useCartDetails(items);

  const handleClick = () => {
    // mimic Order payload creation
    const orderId = Date.now().toString();
    const orderPayload = {
      id: orderId,
      items: cartItems,
      total,
      status: 'PLACED',
    };
    console.log('Order: ', orderPayload);

    navigate('/payments');
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        <h1 className="mb-4 font-medium text-gray-800 uppercase tracking-wide">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-3 space-y-6">
            {/* ADDRESS */}
            <div className="p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-gray-900 mb-4">Delivery Address</h2>
                <span
                  onClick={() => navigate('/manage-address')}
                  className="p-2 mb-2 text-sm font-bold text-ginger uppercase cursor-pointer"
                >
                  CHANGE
                </span>
              </div>
              {address ? (
                <div className="py-4 px-6 bg-gray-50 space-y-1 text-sm text-gray-700">
                  <p className="text-lg font-medium text-gray-900">{address.annotation}</p>
                  <p>{address.house}</p>
                  <p>{address.area}</p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/manage-address')}
                  className="py-3 px-8 shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 cursor-pointer transition"
                >
                  Add new address
                </button>
              )}
            </div>
            {/* PAYMENT (UPDATED) */}
            <div className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-900">Choose Payment Method</h2>
              </div>
              <button
                onClick={handleClick}
                className="w-full py-3 px-6 shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 cursor-pointer transition"
              >
                Proceed to Pay
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE (RECEIPT) ================= */}
          <div className="lg:col-span-2">
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
              <div className="border-t border-dashed border-gray-300 my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal / 100}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span>₹{taxes / 100}</span>
                </div>
                <div className="border-t border-dashed border-gray-300 my-3" />
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span className="text-ginger">₹{total / 100}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
