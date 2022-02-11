import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { BookingTypeState } from './types';
import { BookingTypeModel } from '../../models/booking-type.model';

const initialState: BookingTypeState = Object.freeze({
  bookingTypes: [],
  isLoading: false,
});

export const fetchAllBookingTypes = createAsyncThunk(
  'bookingType/fetchAllBookingTypes',
  async () => ApiService.fetchAllBookingTypes()
);

const bookingTypeSlice = createSlice({
  name: 'bookingType',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllBookingTypes.pending.toString()]: (state) => {
      state.isLoading = true;
      state.bookingTypes = [];
    },
    [fetchAllBookingTypes.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.bookingTypes = [];
    },
    [fetchAllBookingTypes.fulfilled.toString()]: (
      state,
      action: PayloadAction<BookingTypeModel[]>
    ) => {
      state.isLoading = false;
      state.bookingTypes = action.payload;
    },
  },
});

export default bookingTypeSlice.reducer;
