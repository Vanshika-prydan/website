import * as yup from 'yup';

export const AppendToWaitingListRequestModel = {
  email: yup.string().required(),
  postalCode: yup.string().required(),
};
