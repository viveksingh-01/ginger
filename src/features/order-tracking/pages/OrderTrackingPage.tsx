import type IOrderDetail from '@/features/order/models/order';
import { useEffect, useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import DeliveryProgress from '../components/DeliveryProgress';
import ItemsSummary from '../components/ItemsSummary';
import LiveMap from '../components/LiveMap';
import RiderCard from '../components/RiderCard';
import Timeline from '../components/Timeline';
import { useOrderStatusStream } from '../hooks/useOrderStatusStream';

const OrderTrackingPage = () => {
  const [orderDetails, setOrderDetails] = useState<IOrderDetail>();

  const { event, error, loading } = useOrderStatusStream(orderDetails?.orderId ?? null);

  useEffect(() => {
    const orderData = localStorage.getItem('orderDetails');
    setOrderDetails(JSON.parse(orderData ?? ''));
  }, []);

  if (!orderDetails) return null;

  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>{!loading ? 'Connecting…' : 'Loading…'}</p>;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* GRID LAYOUT */}
      <section className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <section className="lg:col-span-3 space-y-6">
          {/* HEADER CARD */}
          <div className="p-5 mb-6 bg-green-600 text-white rounded-2xl shadow">
            <p className="text-xs mb-1">ORDER #{orderDetails?.orderId}</p>
            <h1 className="text-xl font-semibold">{event.title}</h1>
            <CountdownTimer eta={event.eta} />
            {!event.isTerminal && <DeliveryProgress step={event.eta} totalSteps={event.totalSteps} />}
          </div>

          {/* ORDER TIMELINE */}
          <Timeline currentStep={event.step} />

          {/* LIVE DELIVERY TRACKER */}
          {event.step >= 5 && orderDetails?.address && (
            <section className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <LiveMap duration={event.eta} address={orderDetails?.address} />
            </section>
          )}

          {/* DELIVERY PARTNER DETAIL */}
          {event.step >= 4 && (
            <section className="rounded-2xl overflow-hidden shadow-sm">
              <RiderCard />
            </section>
          )}
        </section>

        {/* Order Details */}
        <aside className="lg:col-span-2 space-y-6">
          {orderDetails ? (
            <ItemsSummary
              restaurant={orderDetails.restaurantName}
              items={orderDetails.items}
              billDetails={orderDetails.billDetails}
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Order Summary</h2>
              <p className="text-sm text-gray-600">Loading order details…</p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default OrderTrackingPage;
