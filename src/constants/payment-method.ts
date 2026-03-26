import bhimIcon from '../assets/icons/bhim.png';
import gpayIcon from '../assets/icons/gpay.png';
import paytmIcon from '../assets/icons/paytm.png';
import phonepeIcon from '../assets/icons/phonepe.png';
import type { PaymentMethod } from '../models/payment-method';

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  COD: 'Cash on Delivery',
  UPI: 'UPI / Online Payment',
  CARD: 'Card Payment',
};

export const UPI_OPTIONS = [
  { id: 'phonepe', name: 'PhonePe', icon: phonepeIcon },
  { id: 'gpay', name: 'Google Pay', icon: gpayIcon },
  { id: 'paytm', name: 'Paytm', icon: paytmIcon },
  { id: 'bhim', name: 'BHIM', icon: bhimIcon },
];
