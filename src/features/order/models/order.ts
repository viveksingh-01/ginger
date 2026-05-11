import type IAddress from '@/features/address/models/address';
import type { IBillDetails } from '@/features/checkout/models/cart-response';

export default interface IOrderDetail {
  id: string;
  orderId: number;
  restaurantId: string;
  restaurantName: string;
  address: IAddress;
  items: IOrderItem[];
  billDetails: IBillDetails;
  status: string;
}

export interface IOrderItem {
  cloudinaryImageId: string;
  finalPrice: number;
  isVeg: number;
  menuItemId: string;
  name: string;
  quantity: number;
  strikeOffEnabled: boolean;
  total: number;
}
