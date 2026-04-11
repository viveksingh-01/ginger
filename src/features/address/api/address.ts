import axios from '@/shared/api/axios';
import { handleAPIResponse } from '@/shared/api/utils';
import type { IAddressResponse } from '../models/address';

export const getAddresses = async (): Promise<IAddressResponse> => {
  const res = await axios.get('/addresses');
  return handleAPIResponse<IAddressResponse>(res);
};
