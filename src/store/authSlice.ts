import type { IUser } from '@/features/auth/models/response';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: IUser | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
