import * as yup from 'yup';

export const CreateBookingRequestModel = {
  customerId: yup.string().uuid().optional(),
  frameBookingId: yup.string().uuid().optional(),
  startTime: yup.date().required(),
  durationInMinutes: yup.number().required(),
  addressId: yup.string().uuid().required(),
  privateNotes: yup.string().optional(),
  specialInstructions: yup.string().optional(),
  bookingTypeId: yup.string().uuid().required(),
  employeeId: yup.string().uuid().required(),
  addonIds: yup.array().of(yup.string().uuid().required()).optional(),
};
