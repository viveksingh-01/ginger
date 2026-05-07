import type store from '@/store/store';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { placeOrderRequest } from '../api/order';

const statusMessages = [
  'Confirming your order...',
  'Sending it to the restaurant...',
  'Preparing your bill...',
  'Almost done...',
];

const OrderProcessingPage = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const { cartId, address, paymentMethod } = useSelector((state: ReturnType<typeof store.getState>) => state.checkout);

  useEffect(() => {
    if (!cartId || !address || !paymentMethod) return;
    const payload = {
      cartId,
      addressId: address.id,
      paymentMethod,
    };
    const placeOrder = async () => {
      try {
        const res = await placeOrderRequest(payload);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    placeOrder();
  }, []);

  useEffect(() => {
    // Rotate messages every 2 seconds
    const interval = setInterval(() => {
      setStatusIndex(prev => {
        if (prev === statusMessages.length - 1) return prev;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="max-w-md w-full flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="w-20 h-20 rounded-full border border-orange-100 flex items-center justify-center mb-8">
          <Loader2 className="w-10 h-10 animate-spin text-ginger" />
        </div>

        {/* Main heading */}
        <h1 className="text-2xl font-bold text-gray-900">Placing your order</h1>

        {/* Dynamic status */}
        <p className="mt-4 text-sm text-gray-600 min-h-[24px] transition-all duration-300">
          {statusMessages[statusIndex]}
        </p>

        {/* Note */}
        <p className="mt-8 text-xs text-gray-400 leading-5 max-w-xs">
          Please don’t refresh or close this page while we process your order.
        </p>
      </section>
    </main>
  );
};

export default OrderProcessingPage;
