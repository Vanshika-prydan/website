import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthenticationState from '../../services/authentication-state';

import { AuthState, LoginPayload } from './types';

const initialState: AuthState = Object.freeze({
  isAuthenticated: AuthenticationState.isAuthenticated,
  currentAccount: AuthenticationState.account,
  isLoading: false,
  error: undefined,
  permissions: AuthenticationState.permissions,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialState },
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginPayload>) => {
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.currentAccount = action.payload.account;
      state.error = undefined;
      state.isLoading = false;
    },
    update: (state: AuthState, action: PayloadAction<LoginPayload>) => {
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.currentAccount = action.payload.account;
      state.error = undefined;
      state.isLoading = false;
    },
    logout: (state) => {
      state.currentAccount = undefined;
      state.error = undefined;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.permissions = undefined;
    },
  },
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
