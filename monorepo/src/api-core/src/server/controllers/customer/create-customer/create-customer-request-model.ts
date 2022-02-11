import * as yup from 'yup';

export const CreateCustomerRequestModel = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  personalIdentityNumber: yup.string().required(),
  receiveMarketingCommunication: yup.boolean().optional(),
}
;
