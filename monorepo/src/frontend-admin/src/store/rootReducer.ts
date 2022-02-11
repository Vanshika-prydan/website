import { combineReducers } from '@reduxjs/toolkit';
import roleReducer from './role';
import customerReducer from './customer';
import authReducer from './auth';
import bookingTypeReducer from './booking-type';
import employeeReducer from './employee';
import bookingReducer from './booking';
import addonReducer from './addon';
import frameBookingReducer from './frame-booking';
import accountReducer from './account';

const rootReducer = combineReducers({
  role: roleReducer,
  customer: customerReducer,
  auth: authReducer,
  bookingType: bookingTypeReducer,
  employee: employeeReducer,
  booking: bookingReducer,
  addon: addonReducer,
  frameBooking: frameBookingReducer,
  account: accountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
