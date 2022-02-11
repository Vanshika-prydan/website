import * as yup from 'yup';
const AddAddonsToBookingRequestModel = {
  addonIds: yup.array().of(yup.string().uuid()).required(),
};

export default AddAddonsToBookingRequestModel;
