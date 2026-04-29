export interface ICartResponse {
  statusCode: number;
  statusMessage: string;
  data: ICartData;
}

export interface ICartData {
  cartMeta: ICartMeta;
  cartDetails: ICartDetails;
}

interface ICartMeta {
  cartId: string;
  emailId: string;
  phoneNo: string;
  codEnabled: boolean;
  addressId: string;
  restaurantDetails: IRestaurantDetails;
}

interface IRestaurantDetails {
  id: string;
  name: string;
  cloudinaryImageId: string;
  sla: {
    slaString: string;
  };
}

export interface ICartDetails {
  items: ICartItem[];
  totalItemsCount: number;
  billDetails: IBillDetails;
}

export interface ICartItem {
  menuItemId: string;
  name: string;
  quantity: number;
  total: number;
  finalPrice: number;
  isVeg: number;
  cloudinaryImageId: string;
  strikeOffEnabled: number;
}

export interface IBillDetails {
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  GST: number;
  finalAmount: number;
}
