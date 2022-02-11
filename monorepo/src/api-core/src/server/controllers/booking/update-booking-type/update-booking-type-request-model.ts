import * as yup from 'yup';
export const UpdateBookingTypeRequestModel = {
  name: yup.string().optional(),
  description: yup.string().optional(),
};
