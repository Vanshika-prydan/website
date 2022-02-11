import * as yup from 'yup';
import { WeekDay } from '../../../../../domain/entities/EmployeeDefaultAvailability';
export const SetDefaultEmployeeAvailabilityRequestModel = {
  availability: yup.array().of(yup.object().shape({
    day: yup.string().oneOf(Object.keys(WeekDay)).required(),
    startHour: yup.number().min(0).max(23).integer().required(),
    endHour: yup.number().min(0).max(23).integer().required(),
    startMinute: yup.number().min(0).max(59).integer().optional(),
    endMinute: yup.number().min(0).max(59).integer().optional(),
  })).required(),
};

export const SetDefaultEmployeeAvailabilityParamsRequestModel = {
  employeeId: yup.string().uuid(),
};
