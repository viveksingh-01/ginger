export type CardMerchant = 'VISA' | 'MASTERCARD' | 'RUPAY' | 'AMEX';

export default interface IPaymentCard {
  id: number;
  name: string;
  nickname?: string;
  last4: string;
  merchant: CardMerchant;
  preferred?: boolean;
}
