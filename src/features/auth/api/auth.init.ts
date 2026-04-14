import { setLoading, setUser } from '@/store/authSlice';
import type { AppDispatch } from '@/store/store';
import type IAuthResponse from '../models/response';
import { getProfile } from './auth';

export const initAuth = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(setLoading(false));
    return;
  }

  try {
    const { data }: IAuthResponse = await getProfile();
    dispatch(setUser(data.user));
  } catch (err) {
    console.error('Failed to fetch user');
  }
};
