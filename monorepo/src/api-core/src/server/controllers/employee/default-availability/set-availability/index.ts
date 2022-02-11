import { container } from 'tsyringe';
import SetDefaultEmployeeAvailabilityUseCase from '../../../../../domain/interactors/employee/set-availability';
import buildSetAvailabilityController from './set-availability';

export { SetDefaultEmployeeAvailabilityParamsRequestModel, SetDefaultEmployeeAvailabilityRequestModel } from './request-model';

const setAvailability = container.resolve(SetDefaultEmployeeAvailabilityUseCase);

const setAvailabilityController = buildSetAvailabilityController(setAvailability);
export default setAvailabilityController;
