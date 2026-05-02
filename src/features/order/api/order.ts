import axios from '@/shared/api/axios';
import { handleAPIResponse } from '@/shared/api/utils';

import type IOrderPayload from '../models/request';
import type IOrderResponse from '../models/response';

export const placeOrderRequest = async (body: IOrderPayload): Promise<IOrderResponse> => {
  const res = await axios.post('/order', body);
  return handleAPIResponse<IOrderResponse>(res);
};
