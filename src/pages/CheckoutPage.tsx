import { PAYMENT_LABELS } from '../constants/payment-method';

const CheckoutPage = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        <h1 className="mb-4 font-medium text-gray-800 uppercase tracking-wide">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="p-8 bg-white shadow-sm">
              <h2 className="font-medium text-gray-500 mb-4">Delivery Address</h2>
              <div className="py-4 px-6 bg-gray-50 space-y-1 text-sm text-gray-700">
                <p className="text-lg font-medium text-gray-900">Home</p>
                <p>A-123, Signature Apartments,</p>
                <p>Electronic City Phase-1,</p>
                <p>Bangalore, Karnataka - 560100</p>
              </div>
            </div>
            {/* PAYMENT (UPDATED) */}
            <div className="p-8 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-500">Payment Method</h2>
              </div>

              {/* SELECTED METHOD DISPLAY */}
              <div className="py-4 px-6 bg-gray-50 text-sm text-gray-800 font-medium">{PAYMENT_LABELS['COD']}</div>
            </div>
          </div>
          {/* ================= RIGHT SIDE (RECEIPT) ================= */}
          {/* TO-DO: Display Cart section with final amount */}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
