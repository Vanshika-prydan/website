import * as yup from 'yup';

export const EditCustomerBodyRequestModel = {
  address: yup.object({
    code: yup.string().optional(),
  }).optional(),
};
