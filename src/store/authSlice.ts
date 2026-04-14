import type { IUser } from '@/features/auth/models/response';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: IUser | null;
  token: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;

      localStorage.setItem('token', action.payload.token);
    },

    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loading = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
