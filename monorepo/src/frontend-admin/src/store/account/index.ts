import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { AccountState } from './types';
import { AccountModel } from '../../models/account.model';

const initialState: AccountState = {
  accounts: [],
  isLoading: false,
};
Object.freeze(initialState);

export const fetchAllAccounts = createAsyncThunk(
  'customer/fetchAllAccounts',
  async () => ApiService.fetchAllAccounts()
);

const accountSlice = createSlice({
  name: 'account',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllAccounts.pending.toString()]: (state) => {
      state.isLoading = true;
      state.accounts = [];
    },
    [fetchAllAccounts.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.accounts = [];
    },
    [fetchAllAccounts.fulfilled.toString()]: (
      state,
      action: PayloadAction<AccountModel[]>
    ) => {
      state.isLoading = false;
      state.accounts = action.payload;
    },
  },
});

export default accountSlice.reducer;
