import * as yup from 'yup';

export const CreateFrameBookingRequestModel = {
  customerId: yup.string().uuid().optional(),
  startTime: yup.date().required(),
  endTime: yup.date().optional(),
  occurrence: yup.string().required(),
  durationInMinutes: yup.number().required(),
  addressId: yup.string().uuid().required(),
  privateNotes: yup.string().optional(),
  specialInstructions: yup.string().optional(),
  bookingTypeId: yup.string().uuid().required(),
  employeeId: yup.string().uuid().required(),
  bookingAddons: yup.array().optional(),
};
