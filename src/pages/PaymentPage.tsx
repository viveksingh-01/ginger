import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiMastercard, SiVisa } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPI_OPTIONS } from '../constants/payment-method';
import { PAYMENT_CARDS } from '../data/payment-cards';
import type IPaymentCard from '../models/payment-card';
import type { PaymentMethod } from '../models/payment-method';
import { setPaymentMethod } from '../store/checkoutSlice';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cards, setCards] = useState<IPaymentCard[]>([]);
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | string | null>(null);

  const totalAmount = 214;

  useEffect(() => {
    const savedCards = PAYMENT_CARDS;
    setCards(savedCards);
  }, []);

  const handlePaymentClick = (paymentMethod: PaymentMethod) => {
    dispatch(setPaymentMethod(paymentMethod));
  };

  const getCardIcon = ({ merchant }: IPaymentCard) => {
    if (merchant == 'MASTERCARD') {
      return <SiMastercard size={28} color="#EB001B" />;
    } else if (merchant == 'VISA') {
      return <SiVisa size={28} color="#1A1F71" />;
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="w-5 h-5 cursor-pointer text-gray-700" onClick={() => navigate(-1)} />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Payment Options</h1>
            {/* TO-DO: Replace hard-coded info with dynamic data */}
            <p className="text-sm text-gray-500">
              1 item · Total: ₹{totalAmount} · <span className="text-green-600 font-medium">Savings of ₹20</span>
            </p>
          </div>
        </div>

        {/* ================= UPI PAYMENT ================= */}
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">UPI Payment</h2>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {UPI_OPTIONS.map((upi, idx) => {
              const isSelected = selectedPaymentId === upi.id;
              return (
                <div key={upi.id}>
                  <div
                    className={`px-4 py-4 cursor-pointer flex items-start gap-3 hover:bg-gray-50 transition`}
                    onClick={() => {
                      setSelectedPaymentId(upi.id);
                      setCvv('');
                      setUpiId('');
                    }}
                  >
                    {/* Header row */}
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                      <img src={upi.icon} alt={upi.name} className="w-6 h-6" />
                    </div>
                    <div className="mt-1 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-600">{upi.name}</span>
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

                  {/* Divider except last item */}
                  {idx !== 2 && <div className="border-t border-gray-100" />}
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
              className="p-4 rounded-2xl bg-white flex items-center gap-3 cursor-pointer transition"
            >
              <span className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-lg text-ginger">
                +
              </span>
              <div>
                <p className="text-sm font-medium text-ginger">Add New Card</p>
                <p className="text-xs text-gray-500">Save and Pay via Cards.</p>
              </div>
            </div>
            <div className="border-t border-gray-100" />

            {/* List of saved cards */}
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-200">
              {cards.length > 0 ? (
                cards.map(card => {
                  const isSelected = selectedPaymentId === card.id;
                  return (
                    <div
                      key={card.id}
                      className="px-4 py-4 flex items-start justify-between gap-4 cursor-pointer"
                      onClick={() => {
                        setSelectedPaymentId(card.id);
                        setCvv('');
                      }}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                        {getCardIcon(card)}
                      </div>
                      <div className="mt-1 flex flex-col flex-1">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-gray-800 flex items-center">
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
