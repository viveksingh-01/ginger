import { fetchRestaurantMenu } from '@/features/menu/api/restaurant-menu';
import { useQuery } from '@tanstack/react-query';

const useRestaurantDetails = (restaurantId: string) => {
  return useQuery({
    queryKey: ['restaurantMenu', restaurantId],
    queryFn: () => fetchRestaurantMenu(restaurantId),
    enabled: Boolean(restaurantId),
  });
};

export default useRestaurantDetails;
