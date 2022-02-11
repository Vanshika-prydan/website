import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../services/api-service';
import { FrameBookingState } from './types';
import { FrameBookingModel } from '../../models/frame-booking.model';

const initialState: FrameBookingState = Object.freeze({
  frameBookings: [],
  isLoading: false,
});

export const fetchAllFrameBookings = createAsyncThunk(
  'frameBooking/fetchAllFrameBookings',
  async () => ApiService.fetchAllFrameBookings()
);

const frameBookingSlice = createSlice({
  name: 'frameBooking',
  initialState: { ...initialState },
  reducers: {
    updateFrameBooking(state, action: PayloadAction<FrameBookingModel>) {
      state.frameBookings = [
        ...state.frameBookings.filter(
          (f) => f.frameBookingId !== action.payload.frameBookingId
        ),
        action.payload,
      ];
    },
  },
  extraReducers: {
    [fetchAllFrameBookings.pending.toString()]: (state) => {
      state.isLoading = true;
      state.frameBookings = [];
    },
    [fetchAllFrameBookings.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.frameBookings = [];
    },
    [fetchAllFrameBookings.fulfilled.toString()]: (
      state,
      action: PayloadAction<FrameBookingModel[]>
    ) => {
      state.isLoading = false;
      state.frameBookings = action.payload;
    },
  },
});

export const { updateFrameBooking } = frameBookingSlice.actions;

export default frameBookingSlice.reducer;
