import * as yup from 'yup';
export const DeleteCardRequestModel = {
  cardId: yup.string().required(),
};
