import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HOME_CLEANING, OccurrenceType } from '@services/api-service/types';
import { CustomerAddressModel } from '@models/customer-address.model';

import { SignedInBookingState } from './types';

const initialState: SignedInBookingState = {
  address: null,
  startTime: null,
  durationInMinutes: null,
  occurrence: null,
  specialInstructions: '',
  bookingTypeId: HOME_CLEANING,
  employeeId: '',
  addonIds: [],
};

Object.freeze(initialState);

const signedInBookingSlice = createSlice({
  name: 'signedInBooking',
  initialState: { ...initialState },
  reducers: {
    setAddress: (state, action: PayloadAction<CustomerAddressModel>) => {
      state.address = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string | null>) => {
      state.startTime = action.payload;
    },
    setDurationInMinutes: (state, action: PayloadAction<number | null>) => {
      state.durationInMinutes = action.payload;
    },
    setOccurrence: (state, action: PayloadAction<OccurrenceType | null>) => {
      state.occurrence = action.payload;
    },
    setSpecialInstructions: (state, action: PayloadAction<string>) => {
      state.specialInstructions = action.payload;
    },
    setBookingTypeId: (state, action: PayloadAction<string>) => {
      state.bookingTypeId = action.payload;
    },
    addAddon: (state, action: PayloadAction<string>) => {
      state.addonIds.push(action.payload);
    },
    removeAddon: (state, action: PayloadAction<string>) => {
      state.addonIds = state.addonIds.filter((a) => a !== action.payload);
    },
    setEmployee: (state, action: PayloadAction<string>) => {
      state.employeeId = action.payload;
    },
    reset: (state) => (state = { ...initialState }),
  },
});

export const signedInBookingActions = signedInBookingSlice.actions;
export default signedInBookingSlice.reducer;
