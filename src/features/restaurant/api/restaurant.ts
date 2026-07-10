import type IRestaurant from '../models/restaurant';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

interface IRestaurantResponse {
  data: IRestaurant[];
}

export const fetchRestaurants = async (): Promise<IRestaurant[]> => {
  const res = await fetch(`${BASE_URL}/restaurants?limit=20`);

  if (!res.ok) {
    throw new Error('Failed to fetch restaurant data');
  }

  const result: IRestaurantResponse = await res.json();

  return result.data || [];
};
