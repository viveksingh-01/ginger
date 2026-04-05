import { useEffect, useState } from 'react';
import type IRestaurantWithMenu from '../models/restaurant-menu';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

const useRestaurantDetails = (restaurantId: string) => {
  const [restaurant, setRestaurant] = useState<IRestaurantWithMenu | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;
    fetchRestaurantMenu();
  }, [restaurantId]);

  const fetchRestaurantMenu = async () => {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/menu`);
    const data: IRestaurantWithMenu = await response.json();
    setRestaurant(data);
    setIsLoading(false);
  };

  return { restaurant, isLoading };
};

export default useRestaurantDetails;
