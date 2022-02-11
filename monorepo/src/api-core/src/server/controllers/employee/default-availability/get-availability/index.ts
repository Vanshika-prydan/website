import { container } from 'tsyringe';
import GetAvailability from '../../../../../domain/interactors/employee/get-availability';
import buildGetAvailabilityController from './get-availability';

export { GetDefaultEmployeeAvailabilityParamsRequestModel } from './request-model';

const getAvailability = container.resolve(GetAvailability);

const getAvailabilityController = buildGetAvailabilityController(getAvailability);
export default getAvailabilityController;
