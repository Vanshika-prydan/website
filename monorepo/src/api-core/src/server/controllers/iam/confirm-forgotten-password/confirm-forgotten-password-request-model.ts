import * as yup from 'yup';
export const ConfirmForgottenPasswordRequestModel = {
  email: yup.string().email().required(),
  code: yup.string().required(),
  password: yup.string().required(),
};
