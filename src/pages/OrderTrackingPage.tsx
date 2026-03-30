import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import type { OrderStatus } from '../models/order';

const steps = [
  { key: 'CONFIRMED', label: 'Order is confirmed' },
  { key: 'PREPARING', label: 'Preparing your food' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const OrderTrackingPage = () => {
  const orderId = 1290381;
  const [status, setStatus] = useState<OrderStatus>('CONFIRMED');
  const [eta, setEta] = useState(30);

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-6 pb-24">
        {/* HEADER CARD */}
        <div className="p-5 mb-6 bg-green-600 text-white rounded-2xl shadow">
          <p className="text-xs mb-1">ORDER #{orderId}</p>
          <h1 className="text-xl font-semibold">{steps[currentIndex].label}</h1>
          <CountdownTimer eta={eta} />
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Order Timeline */}
          <div className="lg:col-span-2 space-y-6">{/* TO-DO: ORDER TIMELINE */}</div>

          {/* RIGHT: Order Details */}
          <div className="lg:col-span-1 space-y-6">{/* TO-DO: Ordered Items Summary */}</div>
        </div>
      </div>
    </main>
  );
};

export default OrderTrackingPage;
