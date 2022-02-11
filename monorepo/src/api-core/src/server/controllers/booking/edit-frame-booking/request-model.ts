import * as yup from 'yup';
export const EditFrameBookingRequestModel = {
  employeeId: yup.string().uuid().required(),
};

export const EditFrameBookingRequestPathModel = {
  frameBookingId: yup.string().uuid().required(),
};
