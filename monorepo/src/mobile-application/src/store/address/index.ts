import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { ErrorModel } from '../../models/error.model';
import { AddressState } from './types';
import { CustomerAddressModel } from '../../models/customer-address.model';

const initialState: AddressState = {
  addresses: [],
  isLoading: false,
};
Object.freeze(initialState);

export const fetchAllAddresses = createAsyncThunk(
  'address/fetchAllAddresses',
  async () => {
    return (await ApiService.getCustomers())[0].addresses;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: { ...initialState },
  reducers: {
    updateAddress: (state, action: PayloadAction<CustomerAddressModel>) => {
      state.addresses = [
        ...state.addresses.filter(
          (a) => a.address.addressId !== action.payload.address.addressId
        ),
        action.payload,
      ];
    },
  },
  extraReducers: {
    [fetchAllAddresses.pending.toString()]: (state) => {
      console.log('FETCHING ADDRESS');

      state.isLoading = true;
      state.addresses = [];
    },
    [fetchAllAddresses.rejected.toString()]: (
      state,
      action: PayloadAction<ErrorModel>
    ) => {
      console.log('REJECTED ADDRESS', action);

      state.isLoading = false;
      state.addresses = [];
    },
    [fetchAllAddresses.fulfilled.toString()]: (
      state,
      action: PayloadAction<CustomerAddressModel[]>
    ) => {
      console.log('FETCHED ADDRESS');
      state.isLoading = false;
      state.addresses = action.payload;
    },
  },
});

export const { updateAddress } = addressSlice.actions;
export default addressSlice.reducer;
