import type ICartItem from '../models/cart-item';
import type { ICartItems, ICartPayload } from '../models/cart-payload';
import type { ICartItem as ApiCartItem } from '../models/cart-response';

export const CART_STORAGE_KEY = 'ginger_guest_cart';

// Convert flat items → grouped payload
export const buildCartPayload = (items: ICartItem[], restaurantId: string, addressId: string): ICartPayload => {
  const grouped = items.reduce((acc: Record<string, ICartItems>, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { menuItemId: item.id, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  return {
    cart: {
      restaurantId,
      addressId,
      cartItems: Object.values(grouped),
    },
  };
};

// Convert backend → Redux format (flatten)
export const flattenCartItems = (items: ApiCartItem[]): ICartItem[] => {
  return items.flatMap(item =>
    Array.from({ length: item.quantity }, () => ({
      id: item.menuItemId,
      name: item.name,
      price: item.finalPrice,
      finalPrice: item.finalPrice,
      imageId: item.cloudinaryImageId,
      isVeg: item.isVeg === 1,
      itemPriceStrikeOff: item.strikeOffEnabled === 1,
    }))
  );
};
