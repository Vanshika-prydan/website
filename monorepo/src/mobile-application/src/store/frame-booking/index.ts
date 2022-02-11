import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { ErrorModel } from '../../models/error.model';
import { FrameBookingState } from './types';
import { FrameBookingModel } from '../../models/frame-booking.model';

const initialState:FrameBookingState = Object.freeze({
  frameBookings: [],
  isLoading: false,
});

export const fetchAllFrameBookings = createAsyncThunk('frameBooking/fetchAllFrameBookings', async () => ApiService.fetchAllFrameBookings());

const frameBookingSlice = createSlice({
  name: 'frameBooking',
  initialState: { ...initialState },
  reducers: {

  },
  extraReducers: {
    [fetchAllFrameBookings.pending.toString()]: (state) => {
      state.isLoading = true;
      state.frameBookings = [];
    },
    [fetchAllFrameBookings.rejected.toString()]: (state, action:PayloadAction<ErrorModel>) => {
      state.isLoading = false;
      state.frameBookings = [];
    },
    [fetchAllFrameBookings.fulfilled.toString()]: (state, action: PayloadAction<FrameBookingModel[]>) => {
      state.isLoading = false;
      state.frameBookings = action.payload;
    }
  }
});

export default frameBookingSlice.reducer;
