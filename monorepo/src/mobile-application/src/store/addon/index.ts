import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddonModel } from '../../models/addon.model';
import { ErrorModel } from '../../models/error.model';
import ApiService from '../../services/api-service';
import { AddonState } from './types';

const initialState: AddonState = Object.freeze({
  addons: [],
  isLoading: false,
});

export const fetchAllAddons = createAsyncThunk(
  'addon/fetchAllAddons',
  async () => ApiService.fetchAllAddons()
);

const addonSlice = createSlice({
  name: 'addon',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllAddons.pending.toString()]: (state) => {
      state.addons = [];
      state.isLoading = true;
    },
    [fetchAllAddons.rejected.toString()]: (
      state,
      action: PayloadAction<ErrorModel>
    ) => {
      state.isLoading = false;
    },
    [fetchAllAddons.fulfilled.toString()]: (
      state,
      action: PayloadAction<AddonModel[]>
    ) => {
      state.addons = action.payload;
      state.isLoading = false;
    },
  },
});

export default addonSlice.reducer;
