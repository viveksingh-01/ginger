import type IRestaurantWithMenu from '@/features/restaurant/models/restaurant-menu';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

interface IMenuResponse {
  data: IRestaurantWithMenu;
}

export const fetchRestaurantMenu = async (restaurantId: string): Promise<IRestaurantWithMenu> => {
  const res = await fetch(`${BASE_URL}/restaurants/${restaurantId}/menu`);

  if (!res.ok) {
    throw new Error('Failed to fetch restaurant menu.');
  }

  const result: IMenuResponse = await res.json();

  return result.data || [];
};
