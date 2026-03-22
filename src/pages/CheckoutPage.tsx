const CheckoutPage = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        <h1 className="mb-4 font-medium text-gray-800 uppercase tracking-wide">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="bg-white shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <h2 className="font-medium text-gray-500 mb-4">Delivery Address</h2>
              <div className="space-y-1 text-sm text-gray-700">
                <p className="text-lg font-medium text-gray-900">Home</p>
                <p>A-123, Signature Apartments,</p>
                <p>Electronic City Phase-1,</p>
                <p>Bangalore, Karnataka - 560100</p>
              </div>
            </div>
            {/* PAYMENT (UPDATED) */}
            {/* TO-DO: Display Payment Method section */}
          </div>
          {/* ================= RIGHT SIDE (RECEIPT) ================= */}
          {/* TO-DO: Display Cart section with final amount */}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
