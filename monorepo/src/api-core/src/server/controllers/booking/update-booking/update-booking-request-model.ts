import * as yup from 'yup';
export const UpdateBookingRequestModel = {
  addressId: yup.string().uuid().optional(),
  privateNotes: yup.string().optional(),
  specialInstructions: yup.string().optional(),
  employeeId: yup.string().uuid().optional(),
  bookingTypeId: yup.string().uuid().optional(),
  addonIds: yup.array().of(yup.string().uuid()).optional(),
};
