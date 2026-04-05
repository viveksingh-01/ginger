import amexIcon from '../assets/icons/amex.png';
import bhimIcon from '../assets/icons/bhim.png';
import gpayIcon from '../assets/icons/gpay.png';
import mastercardIcon from '../assets/icons/mastercard.png';
import paytmIcon from '../assets/icons/paytm.png';
import phonepeIcon from '../assets/icons/phonepe.png';
import rupayIcon from '../assets/icons/rupay.png';
import visaIcon from '../assets/icons/visa.png';

import type { CardMerchant } from '../features/payment/models/payment-card';
import type { PaymentMethod } from '../features/payment/models/payment-method';

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

export const CARD_ICON_MAP: Record<CardMerchant, string> = {
  MASTERCARD: mastercardIcon,
  VISA: visaIcon,
  RUPAY: rupayIcon,
  AMEX: amexIcon,
};
