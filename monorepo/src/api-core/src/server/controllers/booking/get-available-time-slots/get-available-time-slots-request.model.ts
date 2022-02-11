import * as yup from 'yup';

export const GetAvailableTimeSlotsRequestModel = {
  durationInMinutes: yup.number().required(),
};
