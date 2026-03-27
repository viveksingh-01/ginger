import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type IPaymentCard from '../models/payment-card';

const AddCardPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    nickname: '',
    secureCard: false,
  });

  const isValid =
    form.cardNumber.replace(/\s/g, '').length >= 12 &&
    form.expiry.length === 5 &&
    form.cvv.length >= 3 &&
    form.name.length > 2;

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const last4 = form.cardNumber.replace(/\s/g, '').slice(-4);

    const newCard: IPaymentCard = {
      id: Date.now(),
      name: form.name,
      last4,
      nickname: form.nickname,
      merchant: +last4 % 2 === 0 ? 'MASTERCARD' : 'VISA',
    };

    const existing = JSON.parse(localStorage.getItem('cards') || '[]');
    localStorage.setItem('cards', JSON.stringify([newCard, ...existing]));

    navigate(-1);
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-4 pb-28">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => navigate(-1)} />
          <div>
            <h1 className="text-lg font-semibold">Add New Card</h1>
            <p className="text-sm text-gray-500">1 item · Total: ₹214</p>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* CARD NUMBER */}
          <input
            placeholder="Card Number"
            value={form.cardNumber}
            onChange={e =>
              handleChange(
                'cardNumber',
                e.target.value
                  .replace(/\D/g, '')
                  .replace(/(.{4})/g, '$1 ')
                  .trim()
              )
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm"
          />

          {/* EXPIRY + CVV */}
          <div className="flex gap-3">
            <input
              placeholder="Valid Through (MM/YY)"
              value={form.expiry}
              onChange={e => {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                handleChange('expiry', val);
              }}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-4 text-sm"
            />

            <input
              placeholder="CVV"
              type="password"
              value={form.cvv}
              onChange={e => handleChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
              className="w-24 border border-gray-200 rounded-xl px-4 py-4 text-sm"
            />
          </div>

          {/* NAME */}
          <input
            placeholder="Name on Card"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm"
          />

          {/* NICKNAME */}
          <input
            placeholder="Card Nickname (for easy identification)"
            value={form.nickname}
            onChange={e => handleChange('nickname', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm"
          />

          {/* SECURE CARD */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.secureCard}
              onChange={() => handleChange('secureCard', !form.secureCard)}
            />
            <p className="text-sm text-gray-600">
              Secure this card <span className="underline font-medium cursor-pointer">Why is it important?</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={handleSave}
          className={`w-full mt-8 py-3 rounded-xl font-medium cursor-pointer
          ${isValid ? 'bg-ginger text-white' : 'bg-gray-300 text-gray-500'}`}
        >
          Proceed
        </button>
      </div>
    </main>
  );
};

export default AddCardPage;
