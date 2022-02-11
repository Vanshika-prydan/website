import * as yup from 'yup';
export const ChangePasswordRequestPayload = {
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
};
