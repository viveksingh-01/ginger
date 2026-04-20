export interface ICartItems {
  menuItemId: string;
  quantity: number;
}

export interface ICartPayload {
  cart: {
    restaurantId: string;
    addressId: string;
    cartItems: ICartItems[];
  };
}
