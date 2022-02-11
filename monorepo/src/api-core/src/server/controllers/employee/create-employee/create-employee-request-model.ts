import * as yup from 'yup';

export const CreateEmployeeRequestModel = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().optional(),
  // roleNames: yup.array().of(yup.string().optional()),
}
;
