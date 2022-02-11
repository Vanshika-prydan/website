import * as yup from 'yup';
import { Occurrence } from '../../../../domain/entities/Occurrence';

export const GetAvailableTimeSlotsRequestBodyModel = {
  occurrence: yup.string().oneOf(Object.values(Occurrence)).optional(),
};
