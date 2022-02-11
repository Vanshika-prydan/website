import { inject, injectable } from 'tsyringe';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccount } from '../../../entities/Account';
import AccountService from '../../../services/account-service';
import { IEmployee } from '../../../entities/Employee';
import { EmployeeDefaultAvailabilityInterface } from '../../../entities/EmployeeDefaultAvailability';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { EmployeeDefaultAvailabilityRepositoryInterface, EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/employee-default-availability-repository';
import { EMPLOYEE_REPOSITORY_INTERFACE, IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';

interface RequestPayload {
    employeeId: string;
}

@injectable()
export default class GetEmployeeDefaultAvailability implements IUseCase<RequestPayload, EmployeeDefaultAvailabilityInterface[]> {
  constructor (
        @inject(EMPLOYEE_DEFAULT_AVAILABILITY_REPOSITORY_INTERFACE) private readonly availabilityRepo: EmployeeDefaultAvailabilityRepositoryInterface,
        @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
        @inject(EMPLOYEE_REPOSITORY_INTERFACE) private readonly employeeRepository:IEmployeeRepository,
  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload ; idOfExecutingAccount: string }): Promise<EmployeeDefaultAvailabilityInterface[]> {
    const executingAccount = await this.accountRepository.findByIdOrFail(idOfExecutingAccount);
    const employee = await this.employeeRepository.fetchByIdOrFail(payload.employeeId);
    this.authorizeUser(employee, executingAccount);
    return this.availabilityRepo.fetchByEmployee(employee.employeeId);
  }

  private authorizeUser (employee: IEmployee, executingAccount: IAccount) {
    if (employee.account.accountId !== executingAccount.accountId)
      AccountService.authorize(executingAccount, Permission.EMPLOYEE_UPDATE);
  }
}
