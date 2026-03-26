import gpayIcon from '../assets/icons/gpay.svg';
import paytmIcon from '../assets/icons/paytm.svg';
import phonepeIcon from '../assets/icons/phonepe.svg';
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
];
