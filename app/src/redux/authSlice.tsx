import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
  canPlay: boolean;
  isWin: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
  canPlay: false,
  isWin: false,
};

interface LoginPayload {
  email: string;
  token: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginPayload>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
    },
    playAuthorization(state) {
      state.canPlay = true;
    },
    playWin(state) {
      state.isWin = true;
    },
  },
});

export const { loginSuccess, logout, playAuthorization, playWin } = authSlice.actions;

export default authSlice.reducer;