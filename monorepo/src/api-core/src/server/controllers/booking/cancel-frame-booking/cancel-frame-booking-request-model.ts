import * as yup from 'yup';

export const CancelFrameBookingRequestModel = {
  frameBookingId: yup.string().uuid().required(),
};
