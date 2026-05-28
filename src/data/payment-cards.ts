import type IPaymentCard from '../features/payment/models/payment-card';

export const PAYMENT_CARDS: IPaymentCard[] = [
  {
    id: 1774368293074757,
    name: 'John Doe',
    nickname: 'John',
    last4: '4757',
    merchant: 'MASTERCARD',
    preferred: true,
  },
  {
    id: 2374687762257288,
    name: 'Chris Martin',
    nickname: 'Chris',
    last4: '7288',
    merchant: 'VISA',
  },
  {
    id: 7892374987672784,
    name: 'Matt Bellamy',
    nickname: 'Matt',
    last4: '2784',
    merchant: 'AMEX',
  },
];
