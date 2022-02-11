import * as yup from 'yup';

export const LoginRequestModel = {
  email: yup.string().required(),
  password: yup.string().required(),
};
