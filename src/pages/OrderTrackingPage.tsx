import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import ItemsSummary from '../components/ItemsSummary';
import Timeline from '../components/Timeline';

const steps = [
  { key: 'CONFIRMED', label: 'Order is confirmed' },
  { key: 'PREPARING', label: 'Preparing your food' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const OrderTrackingPage = () => {
  const orderId = 1290381;
  const [eta, setEta] = useState(30);

  const getStepIndex = () => {
    if (eta === 0) return 3; // Delivered
    if (eta <= 12) return 2; // Out for delivery
    if (eta <= 16) return 1; // Preparing
    return 0; // Confirmed
  };
  const currentStepIndex = getStepIndex();

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* GRID LAYOUT */}
      <section className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <section className="lg:col-span-3 space-y-6">
          {/* HEADER CARD */}
          <div className="p-5 mb-6 bg-green-600 text-white rounded-2xl shadow">
            <p className="text-xs mb-1">ORDER #{orderId}</p>
            <h1 className="text-xl font-semibold">{steps[currentStepIndex].label}</h1>
            <CountdownTimer eta={eta} />
          </div>
          {/* TO-DO: ORDER TIMELINE */}
          <Timeline currentStep={currentStepIndex} />
        </section>

        {/* Order Details */}
        <aside className="lg:col-span-2 space-y-6">
          <ItemsSummary />
        </aside>
      </section>
    </main>
  );
};

export default OrderTrackingPage;
