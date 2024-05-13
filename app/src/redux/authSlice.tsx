import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définition du type du state initial
interface AuthState {
    user: User | null
    token: string | null
}

// Initialisation du state initial
const initialState: AuthState = {
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export const selectAuth = (state:any) => state.auth;
  export default authSlice.reducer;