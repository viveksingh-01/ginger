import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CARD_ICON_MAP, UPI_OPTIONS } from '../../../constants/payment-method';
import { PAYMENT_CARDS } from '../../../data/payment-cards';
import { setPaymentMethod } from '../../../store/checkoutSlice';
import { useCartDetails } from '../hooks/useCartDetails';
import type IPaymentCard from '../models/payment-card';
import type { PaymentMethod } from '../models/payment-method';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cards, setCards] = useState<IPaymentCard[]>([]);
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | string | null>(null);

  const { count, totalAmount, savings } = useCartDetails();

  useEffect(() => {
    const savedCards = PAYMENT_CARDS;
    setCards(savedCards);
  }, []);

  const handlePaymentClick = (paymentMethod: PaymentMethod) => {
    dispatch(setPaymentMethod(paymentMethod));
    navigate('/order/request');
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto p-4 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="w-5 h-5 cursor-pointer text-gray-700" onClick={() => navigate(-1)} />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Payment Options</h1>
            {/* TO-DO: Replace hard-coded info with dynamic data */}
            <p className="text-sm text-gray-500">
              {count} item(s) · Total: ₹{totalAmount} ·{' '}
              <span className="text-green-600 font-medium">Savings of ₹{savings}</span>
            </p>
          </div>
        </div>

        {/* ================= UPI PAYMENT ================= */}
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">UPI Payment</h2>

          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
            {UPI_OPTIONS.map(upi => {
              const isSelected = selectedPaymentId === upi.id;
              return (
                <div key={upi.id}>
                  <div
                    className={`px-4 py-4 cursor-pointer flex items-start gap-4 hover:bg-gray-50 transition`}
                    onClick={() => {
                      setSelectedPaymentId(upi.id);
                      setCvv('');
                      setUpiId('');
                    }}
                  >
                    {/* Header row */}
                    <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md">
                      <img src={upi.icon} alt={upi.name} className="w-7 h-7 object-contain" />
                    </div>
                    <div className="mt-2 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-800">{upi.name}</span>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
                        >
                          {isSelected && '✓'}
                        </span>
                      </div>

                      {/* UPI ID input + Pay button */}
                      {isSelected && (
                        <div className="flex items-center gap-3 mt-3">
                          <input
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            className="flex-1 border border-green-600 rounded-xl px-3 py-3 text-sm focus:outline-none"
                          />
                          <button
                            disabled={upiId.trim() === ''}
                            onClick={() => handlePaymentClick('UPI')}
                            className={`py-3 px-8 rounded-xl text-white font-medium transition ${
                              upiId.trim() !== '' ? 'bg-green-600 hover:bg-green-800' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                          >
                            Pay ₹{totalAmount}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= CARDS SECTION ================= */}
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Credit & Debit Cards</h2>
          {/* Add New Card */}
          <div className="bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition mb-4">
            <div
              onClick={() => navigate('add-card')}
              className="p-4 rounded-2xl bg-white flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="w-10 h-8 flex items-center justify-center text-xl font-bold text-ginger border border-gray-200 rounded-md">
                +
              </span>
              <div>
                <p className="text-sm font-medium text-ginger">Add New Card</p>
                <p className="text-xs text-gray-500">Save and Pay via Cards.</p>
              </div>
            </div>
            <div className="border-t border-gray-100" />

            {/* List of saved cards */}
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {cards.length > 0 ? (
                cards.map(card => {
                  const isSelected = selectedPaymentId === card.id;
                  return (
                    <div
                      key={card.id}
                      className="px-4 py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => {
                        setSelectedPaymentId(card.id);
                        setCvv('');
                      }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md">
                        <img src={CARD_ICON_MAP[card.merchant]} alt={card.name} className="w-7 h-7 object-contain" />
                      </div>
                      <div className="mt-2 flex flex-col flex-1">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-800 flex items-center">
                            {card.nickname || card.name}
                            <span className="text-gray-300 font-extralight text-lg mx-2">|</span>
                            <span className="text-sm">•••• {card.last4}</span>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
                          >
                            {isSelected && '✓'}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-3 mt-4">
                            <input
                              placeholder="CVV"
                              value={cvv}
                              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              className="w-20 border border-green-600 rounded-xl p-3 text-sm text-center focus:outline-none"
                            />
                            <button
                              onClick={() => handlePaymentClick('CARD')}
                              disabled={cvv.length !== 3}
                              className={`flex-1 py-3 rounded-xl text-white font-medium ${cvv.length === 3 ? 'bg-green-600 cursor-pointer hover:bg-green-800 transition' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                              Pay ₹{totalAmount}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-4 text-sm text-gray-500">No saved cards</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentPage;
