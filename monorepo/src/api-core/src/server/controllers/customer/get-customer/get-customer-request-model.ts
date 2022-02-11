import * as yup from 'yup';
export const GetCustomerRequestModel = {
  customerId: yup.string().uuid().required(),
};
