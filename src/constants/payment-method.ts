import type { PaymentMethod } from '../models/payment-method';

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  COD: 'Cash on Delivery',
  UPI: 'UPI / Online Payment',
  CARD: 'Card Payment',
};
