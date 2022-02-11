import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { CustomerState } from './types';
import { CustomerModel } from '../../models/customer.model';

const initialState: CustomerState = Object.freeze({
  customers: [],
  isLoading: false,
});

export const fetchAllCustomers = createAsyncThunk(
  'customer/fetchAllCustomers',
  async () => ApiService.fetchAllCustomers()
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllCustomers.pending.toString()]: (state) => {
      state.isLoading = true;
      state.customers = [];
    },
    [fetchAllCustomers.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.customers = [];
    },
    [fetchAllCustomers.fulfilled.toString()]: (
      state,
      action: PayloadAction<CustomerModel[]>
    ) => {
      state.isLoading = false;
      state.customers = action.payload;
    },
  },
});

export default customerSlice.reducer;
