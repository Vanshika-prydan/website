import * as yup from 'yup';

export const JWTRefreshTokenRequestModel = {
  refreshToken: yup.string().required(),
};
