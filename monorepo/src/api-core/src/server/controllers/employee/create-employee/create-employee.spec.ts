import { ErrorCode } from '../../../../domain/entities/ErrorCode';
import { CreateEmployeeUseCase } from '../../../../domain/interactors/employee/create-employee/create-employee';
import ControllerTest from '../../../../utilities/controller-test';
import { EmployeeDTO } from '../../../models/employee.model';
import { buildCreateEmployee } from './create-employee';

describe('Create employee controller', () => {
  it('should get a 201 response when the customer is created', async () => {
    const utils = new ControllerTest();
    const resolveValue = {};
    const EmpDto = jest.fn() as unknown as typeof EmployeeDTO;
    const useCase = utils.resolveUseCase<CreateEmployeeUseCase>(resolveValue);
    const createEmployee = buildCreateEmployee({ createEmployeeUseCase: useCase, EmployeeDTO: EmpDto });

    await createEmployee(utils.request, utils.response, utils.next);
    expect(utils.response.status).toHaveBeenCalledWith(201);
    expect(utils.response.json).toHaveBeenCalled();
    expect.assertions(2);
  });

  it('should call next when an error happens', async () => {
    const utils = new ControllerTest();
    const EmpDto = jest.fn() as unknown as typeof EmployeeDTO;
    const useCase = utils.rejectUseCase<CreateEmployeeUseCase>(ErrorCode.ACCESS_DENIED);
    const createEmployee = buildCreateEmployee({ createEmployeeUseCase: useCase, EmployeeDTO: EmpDto });

    await createEmployee(utils.request, utils.response, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
