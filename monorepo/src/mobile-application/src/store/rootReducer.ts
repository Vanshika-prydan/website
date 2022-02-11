import { combineReducers } from '@reduxjs/toolkit';

import makeBookingReducer from './make-booking';
import authenticationReducer from './authentication';
import addonReducer from './addon';
import bookingReducer from './booking';
import creditCardReducer from './credit-card';
import signedInBookingReducer from './signed-in-booking';
const rootReducer = combineReducers({
  makeBooking: makeBookingReducer,
  authentication: authenticationReducer,
  addon: addonReducer,
  booking: bookingReducer,
  creditCard: creditCardReducer,
  signedInBooking: signedInBookingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
