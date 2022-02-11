import * as yup from 'yup';

export const AddAddressRequestModel = {
  information: yup.string().optional(),
  street: yup.string().required(),
  postalCity: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  code: yup.string().optional(),
  addressName: yup.string().optional(),
  numberOfBathrooms: yup.number().optional(),
  homeAreaInM2: yup.number().optional(),
}
;
