import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Occurrence, OccurrenceType } from '../../services/api-service/types';
import { MakeBookingState } from './types';

const initialState: MakeBookingState = {
  bookingType: 'HOME_CLEANING',
  postalCode: '',
  homeAreaInM2: null,
  numberOfBathrooms: null,
  durationInMinutes: 3 * 60,
  addonIds: [],
  occurrence: null,
  startTime: null,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  personalIdentityNumber: '',
  street: '',
  postalCity: 'Stockholm',
  doorCode: '',
  acceptsCommunication: true,
  selectedEmployeeId: null,
};

const makeBookingSlice = createSlice({
  name: 'makeBooking',
  initialState: { ...initialState },
  reducers: {
    setPostalCode: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload.trim();
    },
    setHomeAreaInM2: (state, action: PayloadAction<number | null>) => {
      state.homeAreaInM2 = action.payload;
    },
    setNumberOfBathrooms: (state, action: PayloadAction<number | null>) => {
      state.numberOfBathrooms = action.payload;
    },
    setDurationInMinutes: (state, action: PayloadAction<number>) => {
      state.durationInMinutes = action.payload;
    },
    addAddon: (state, action: PayloadAction<string>) => {
      state.addonIds.push(action.payload);
    },
    removeAddon: (state, action: PayloadAction<string>) => {
      state.addonIds = state.addonIds.filter((a) => a !== action.payload);
    },
    setAddons: (state, action: PayloadAction<string[]>) => {
      state.addonIds = action.payload;
    },
    setOccurrence: (state, action: PayloadAction<OccurrenceType | null>) => {
      state.occurrence = action.payload ?? Occurrence.WEEKLY;
    },
    setStartTime: (state, action: PayloadAction<string | null>) => {
      state.startTime = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload.trimStart();
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload.trimStart();
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload.trim();
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload.trim();
    },
    setPersonalIdentityNumber: (state, action: PayloadAction<string>) => {
      state.personalIdentityNumber = action.payload.trim();
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload.trimStart();
    },
    setPostalCity: (state, action: PayloadAction<string>) => {
      state.postalCity = action.payload.trim();
    },
    setDoorCode: (state, action: PayloadAction<string>) => {
      state.doorCode = action.payload.trimStart();
    },
    setAcceptsCommunication: (state, action: PayloadAction<boolean>) => {
      state.acceptsCommunication = action.payload;
    },
    setSelectedEmployeeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
});

export const { setPostalCode } = makeBookingSlice.actions;
export const makeBookingActions = makeBookingSlice.actions;
export default makeBookingSlice.reducer;
