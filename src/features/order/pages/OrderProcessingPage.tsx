import type store from '@/store/store';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrderRequest } from '../api/order';

const statusMessages = [
  'Confirming your order...',
  'Sending it to the restaurant...',
  'Preparing your bill...',
  'Almost done...',
];

const OrderProcessingPage = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { cartId, address, paymentMethod } = useSelector((state: ReturnType<typeof store.getState>) => state.checkout);
  const navigate = useNavigate();

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
        navigate('/order/success');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    placeOrder();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    setStatusIndex(0);

    const intervalId = setInterval(() => {
      setStatusIndex(prev => {
        if (prev >= statusMessages.length - 1) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isLoading]);

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
