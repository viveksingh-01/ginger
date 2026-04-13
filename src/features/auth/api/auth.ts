import axios from '@/shared/api/axios';
import { handleAPIResponse } from '@/shared/api/utils';
import type { ILoginPayload, ISignupPayload } from '../models/payload';
import type IAuthResponse from '../models/response';

export const login = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const res = await axios.post('/auth/login', payload);
  return handleAPIResponse<IAuthResponse>(res);
};

export const signup = async (payload: ISignupPayload): Promise<IAuthResponse> => {
  const res = await axios.post('/auth/signup', payload);
  return handleAPIResponse<IAuthResponse>(res);
};

export const getProfile = async (): Promise<IAuthResponse> => {
  const res = await axios.get('/me');
  return handleAPIResponse<IAuthResponse>(res);
};
