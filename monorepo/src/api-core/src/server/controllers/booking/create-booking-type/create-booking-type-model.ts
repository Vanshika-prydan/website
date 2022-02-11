import * as yup from 'yup';
export const CreateBookingTypeModel = {
  name: yup.string().required(),
  description: yup.string().required(),
};
