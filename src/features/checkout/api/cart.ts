import axios from '@/shared/api/axios';
import { handleAPIResponse } from '@/shared/api/utils';
import type { ICartPayload } from '../models/cart-payload';
import type { ICartResponse } from '../models/cart-response';

export const getCart = async (): Promise<ICartResponse> => {
  const res = await axios.get('/cart');
  return handleAPIResponse<ICartResponse>(res);
};

export const addToCart = async (body: ICartPayload): Promise<ICartResponse> => {
  const res = await axios.post('/cart', body);
  const guestId = res.headers['x-guest-id'];
  if (guestId) {
    localStorage.setItem('guestId', res.headers['x-guest-id']);
  }
  return handleAPIResponse<ICartResponse>(res);
};

export const mergeCart = async (payload: ICartPayload): Promise<ICartResponse> => {
  const res = await axios.post('/cart/merge', payload);
  const data: ICartResponse = res.data;

  if (data.statusCode !== 0) {
    throw new Error(data.statusMessage || 'Cart merge failed');
  }

  return data;
};
