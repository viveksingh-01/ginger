import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type store from '@/store/store';

import { useAddress } from '@/features/address/hooks/useAddress';
import type IAddress from '@/features/address/models/address';
import { isAuthenticated } from '@/utils/auth';
import Cart from '../components/Cart';

const CheckoutPage = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const address = useSelector((state: ReturnType<typeof store.getState>) => state.checkout.address);
  const navigate = useNavigate();

  const { data: addressResponse } = useAddress();
  const addressList: IAddress[] = addressResponse?.data ?? [];

  const handleClick = () => {
    navigate('/payments');
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        <h1 className="mb-4 font-medium text-gray-800 uppercase tracking-wide">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <section className="lg:col-span-3 space-y-6">
            {/* ADDRESS */}
            <section className="p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-gray-900 mb-4">Delivery Address</h2>
                {address && (
                  <span
                    onClick={() => navigate('/manage-address')}
                    className="p-2 mb-2 text-sm font-bold text-ginger uppercase cursor-pointer"
                  >
                    CHANGE
                  </span>
                )}
              </div>
              {address ? (
                <div className="py-4 px-6 bg-gray-50 space-y-1 text-sm text-gray-700">
                  <p className="text-lg font-medium text-gray-900">{address.annotation}</p>
                  <p>{address.house}</p>
                  <p>{address.address}</p>
                </div>
              ) : addressList.length > 0 ? (
                <button
                  onClick={() => navigate('/manage-address')}
                  disabled={cartItems.length == 0}
                  className="w-full py-3 px-8 shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 cursor-pointer transition"
                >
                  Select an address
                </button>
              ) : (
                <button
                  onClick={() => navigate('/manage-address')}
                  className="w-full py-3 px-8 shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 cursor-pointer transition"
                >
                  Add new address
                </button>
              )}
            </section>
            {/* PAYMENT */}
            <section className="p-6 bg-white shadow-sm">
              <h2 className="mb-4 font-medium text-gray-900">Choose Payment Method</h2>
              <button
                onClick={handleClick}
                disabled={!address?.id}
                className="
                  w-full py-3 px-6 shadow-sm bg-green-600 text-white font-medium hover:bg-green-700 cursor-pointer transition
                  disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed
                "
              >
                Proceed to Pay
              </button>
            </section>
          </section>

          {/* ================= RIGHT SIDE (CART)================= */}
          <Cart addressId={address?.id ?? ''} isSignedIn={isAuthenticated()} />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
