import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '../api/restaurant';

export const useRestaurants = () => {
  return useQuery({
    queryFn: fetchRestaurants,
    queryKey: ['restaurants'],
  });
};
