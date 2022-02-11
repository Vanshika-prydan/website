import * as yup from 'yup';
export const CreateAddonRequestModel = {
  name: yup.string().required(),
  description: yup.string().required(),
  defaultTimeInMinutes: yup.number().required(),
};
