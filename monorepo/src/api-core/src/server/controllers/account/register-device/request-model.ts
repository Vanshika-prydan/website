
import * as yup from 'yup';
export const RegisterDeviceRequestModel = {
  token: yup.string().required(),
};
