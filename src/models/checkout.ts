import type IAddress from './address';
import type { PaymentMethod } from './payment-method';

export default interface ICheckoutState {
  address: IAddress | null;
  paymentMethod: PaymentMethod;
}
