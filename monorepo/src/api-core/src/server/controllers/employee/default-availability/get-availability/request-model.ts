import * as yup from 'yup';

export const GetDefaultEmployeeAvailabilityParamsRequestModel = {
  employeeId: yup.string().uuid().required(),
};
