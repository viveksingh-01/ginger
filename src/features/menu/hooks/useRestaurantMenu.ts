import { useEffect, useState } from 'react';
import type IMenu from '../models/menu';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

const useRestaurantMenu = (restaurantId: string) => {
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;
    fetchRestaurantMenu();
  }, [restaurantId]);

  const fetchRestaurantMenu = async () => {
    const response = await fetch(`${BASE_URL}/menu/${restaurantId}`);
    const data = await response.json();
    setMenu(data);
    setIsLoading(false);
  };

  return { menu, isLoading };
};

export default useRestaurantMenu;
