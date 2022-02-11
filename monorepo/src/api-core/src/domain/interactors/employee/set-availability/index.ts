import { inject, injectable } from 'tsyringe';
import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IAccount } from '../../../entities/Account';
import AccountService from '../../../services/account-service';
import { IEmployee } from '../../../entities/Employee';
import SetDefaultEmployeeAvailability, { Availability } from './index1';
import { ACCOUNT_REPOSITORY_INTERFACE, IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { EMPLOYEE_REPOSITORY_INTERFACE, IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import EmployeeDefaultAvailability from '../../../entities/EmployeeDefaultAvailability';

interface RequestPayload {
    employeeId: string;
    availability: Availability[];
}

@injectable()
export default class SetDefaultEmployeeAvailabilityUseCase implements IUseCase<RequestPayload, EmployeeDefaultAvailability[]> {
  constructor (
        private readonly setAvailabilityUseCase: SetDefaultEmployeeAvailability,
        @inject(ACCOUNT_REPOSITORY_INTERFACE) private readonly accountRepository: IAccountRepository,
        @inject(EMPLOYEE_REPOSITORY_INTERFACE) private readonly employeeRepository:IEmployeeRepository,

  ) {}

  async execute ({ payload, idOfExecutingAccount }: { payload: RequestPayload ; idOfExecutingAccount: string }): Promise<EmployeeDefaultAvailability[]> {
    const executingAccount = await this.accountRepository.findByIdOrFail(idOfExecutingAccount);
    const employee = await this.employeeRepository.fetchByIdOrFail(payload.employeeId);
    this.authorizeUser(employee, executingAccount);
    return this.setAvailabilityUseCase.execute({ employee, availability: payload.availability });
  }

  private authorizeUser (employee: IEmployee, executingAccount: IAccount) {
    if (employee.account.accountId !== executingAccount.accountId)
      AccountService.authorize(executingAccount, Permission.EMPLOYEE_UPDATE);
  }
}
