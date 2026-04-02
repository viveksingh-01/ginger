import { useEffect, useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import DeliveryProgress from '../components/DeliveryProgress';
import ItemsSummary from '../components/ItemsSummary';
import LiveMap from '../components/LiveMap';
import RiderCard from '../components/RiderCard';
import Timeline from '../components/Timeline';
import { ORDER_STEPS } from '../constants/order-steps';

const TOTAL_ETA = 30;

const OrderTrackingPage = () => {
  const orderId = 1290381;
  const [eta, setEta] = useState(TOTAL_ETA);

  // Simulate ETA countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(prev - 1, 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStepIndex = () => {
    if (eta === 0) return 3; // Delivered
    if (eta <= 16) return 2; // Out for delivery
    if (eta <= 28) return 1; // Preparing
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
            <h1 className="text-xl font-semibold">{ORDER_STEPS[currentStepIndex].message}</h1>
            <CountdownTimer eta={eta} />
            {currentStepIndex < 3 && <DeliveryProgress eta={eta} totalEta={TOTAL_ETA} />}
          </div>

          {/* ORDER TIMELINE */}
          <Timeline currentStep={currentStepIndex} />

          {/* LIVE DELIVERY TRACKER */}
          {currentStepIndex >= 2 && (
            <section className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <LiveMap duration={eta} />
            </section>
          )}

          {/* DELIVERY PARTNER DETAIL */}
          {currentStepIndex >= 2 && (
            <section className="rounded-2xl overflow-hidden shadow-sm">
              <RiderCard />
            </section>
          )}
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
