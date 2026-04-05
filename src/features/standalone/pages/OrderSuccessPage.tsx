import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
      if (countdown === 1) {
        navigate('/order/track');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Success Icon */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-ginger/20 blur-2xl rounded-full"></div>
        <CheckCircle className="w-20 h-20 text-green-600 relative" />
      </div>

      <h1 className="text-4xl font-bold text-gray-400">Woo-Hoo!</h1>
      <h1 className="mt-4 text-2xl font-medium text-gray-700">Your order has been placed successfully.</h1>

      <div className="mt-10 w-full max-w-sm">
        <button className="w-full py-3 px-6 shadow-sm bg-ginger text-white font-medium hover:bg-green-700 cursor-pointer transition">
          Redirecting in... <span className="font-bold">{countdown}</span>
        </button>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
