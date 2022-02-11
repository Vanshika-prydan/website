import * as yup from 'yup';

export const EditCustomerAddressParamsRequestModel = {
  customerAddressId: yup.string().uuid().required(),
};
