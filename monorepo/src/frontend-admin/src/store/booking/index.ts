import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { BookingState } from './types';
import { BookingModel } from '../../models/booking.model';

const initialState: BookingState = Object.freeze({
  bookings: [],
  isLoading: false,
});

export const fetchAllBookings = createAsyncThunk(
  'booking/fetchAllBookings',
  async () => ApiService.fetchAllBookings()
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [fetchAllBookings.pending.toString()]: (state) => {
      state.isLoading = true;
      state.bookings = [];
    },
    [fetchAllBookings.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.bookings = [];
    },
    [fetchAllBookings.fulfilled.toString()]: (
      state,
      action: PayloadAction<BookingModel[]>
    ) => {
      state.isLoading = false;
      state.bookings = action.payload;
    },
  },
});

export default bookingSlice.reducer;
