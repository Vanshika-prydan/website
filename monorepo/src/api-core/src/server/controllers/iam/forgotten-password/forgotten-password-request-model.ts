import * as yup from 'yup';
export const ForgottenPasswordRequestModel = {
  email: yup.string().email().required(),
};
