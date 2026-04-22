import { mergeCart } from '@/features/checkout/api/cart';
import { buildCartPayload, CART_STORAGE_KEY, flattenCartItems } from '@/features/checkout/utils/cart';

export const handleGuestCartMerge = async (restaurantId: string, addressId: string) => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);

  if (!stored) return null;
  const rawItems = JSON.parse(stored);

  if (!rawItems.length) return null;

  try {
    const payload = buildCartPayload(rawItems, restaurantId, addressId);
    const res = await mergeCart(payload);

    // clear guest cart
    localStorage.removeItem(CART_STORAGE_KEY);

    return flattenCartItems(res.data.cartDetails.items);
  } catch (err) {
    console.error('Cart merge failed');
    return null;
  }
};
