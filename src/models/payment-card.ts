export type CardMerchant = 'VISA' | 'MASTERCARD';

export default interface IPaymentCard {
  id: number;
  name: string;
  nickname?: string;
  last4: string;
  merchant: CardMerchant;
  preferred?: boolean;
}
