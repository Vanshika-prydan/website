import * as yup from 'yup';
export const SetDefaultPaymentMethodRequestModel = {
  cardId: yup.string().required(),
};
