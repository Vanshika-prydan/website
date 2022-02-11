import * as yup from 'yup';
export const EditAccountRequestModel = {
  accountId: yup.string().uuid().required(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phoneNumber: yup.string().optional(),
};
