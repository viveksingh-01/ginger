import type IAddress from '../../address/models/address';
import type { PaymentMethod } from '../../payment/models/payment-method';

export default interface ICheckoutState {
  cartId: string | null;
  address: IAddress | null;
  paymentMethod: PaymentMethod | null;
}
