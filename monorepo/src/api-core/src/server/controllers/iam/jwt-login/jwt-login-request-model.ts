import * as yup from 'yup';

export const JWTLoginRequestModel = {
  email: yup.string().required(),
  password: yup.string().required(),
};
