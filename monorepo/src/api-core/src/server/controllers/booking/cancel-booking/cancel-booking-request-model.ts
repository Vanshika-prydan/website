import * as yup from 'yup';
export const CancelBookingRequestModel = {
  bookingId: yup.string().uuid().required(),
};
