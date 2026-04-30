import type { IAddressResponse } from '@/features/address/models/address';
import type ICartItem from '@/features/checkout/models/cart-item';
import type { IBillDetails } from '@/features/checkout/models/cart-response';

export default interface IPlaceOrderResponse {
  id: string;
  restaurantId: string;
  restaurantName: string;
  address: IAddressResponse;
  items: ICartItem[];
  billDetails: IBillDetails;
  status: string;
}
