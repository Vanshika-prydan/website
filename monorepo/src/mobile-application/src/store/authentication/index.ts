import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JWTResponseModel } from '../../models/jwt-response.model';

import { AuthenticationState } from './types';

const initialState: AuthenticationState = {
  isAuthenticated: false,
  currentAccount: undefined,
  isLoading: true,
  error: undefined,
  permissions: [],
  accessToken: null,
  refreshToken: null,
  isRegistering: false,
};
Object.freeze(initialState);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: { ...initialState },
  reducers: {
    login: (
      state: AuthenticationState,
      action: PayloadAction<JWTResponseModel>
    ) => {
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.currentAccount = action.payload.account;
      state.error = undefined;
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    update: (
      state: AuthenticationState,
      action: PayloadAction<JWTResponseModel>
    ) => {
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.currentAccount = action.payload.account;
      state.error = undefined;
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.currentAccount = undefined;
      state.error = undefined;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.permissions = undefined;
      state.accessToken = null;
      state.refreshToken = null;
      state.isRegistering = false;
    },
    setIsRegistering: (
      state: AuthenticationState,
      action: PayloadAction<boolean>
    ) => {
      state.isRegistering = action.payload;
    },
  },
});

export const { login, logout, update, setIsRegistering } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
