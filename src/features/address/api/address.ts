import axios from '@/shared/api/axios';
import { handleAPIResponse } from '@/shared/api/utils';
import type { IAddressResponse, ISaveAddressPayload } from '../models/address';

export const getAddresses = async (): Promise<IAddressResponse> => {
  const res = await axios.get('/addresses');
  return handleAPIResponse<IAddressResponse>(res);
};

export const saveAddress = async (body: ISaveAddressPayload): Promise<IAddressResponse> => {
  const res = await axios.post('/address', body);
  return handleAPIResponse<IAddressResponse>(res);
};

export const deleteAddress = async (addressId: string): Promise<IAddressResponse> => {
  const res = await axios.delete(`/address/${addressId}`);
  return handleAPIResponse<IAddressResponse>(res);
};
