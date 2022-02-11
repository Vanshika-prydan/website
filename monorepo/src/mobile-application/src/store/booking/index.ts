import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { ErrorModel } from '../../models/error.model';
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
  reducers: {
    updateBooking: (state, action: PayloadAction<BookingModel>) => {
      state.bookings = [
        ...state.bookings.filter(
          (b) => b.bookingId !== action.payload.bookingId
        ),
        action.payload,
      ];
    },
  },
  extraReducers: {
    [fetchAllBookings.pending.toString()]: (state) => {
      console.log('FETCHING BOOKINGS');

      state.isLoading = true;
      state.bookings = [];
    },
    [fetchAllBookings.rejected.toString()]: (
      state,
      action: PayloadAction<ErrorModel>
    ) => {
      console.log('REJECTED BOOKINGS', action);

      state.isLoading = false;
      state.bookings = [];
    },
    [fetchAllBookings.fulfilled.toString()]: (
      state,
      action: PayloadAction<BookingModel[]>
    ) => {
      console.log('FETCHED BOOKINGS');
      state.isLoading = false;
      state.bookings = action.payload;
    },
  },
});

export const { updateBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
