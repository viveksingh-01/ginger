import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../api/address';

export const useAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: getAddresses,
  });
};
