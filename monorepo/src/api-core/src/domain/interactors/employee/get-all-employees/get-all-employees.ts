import IUseCase from '../../IUseCase';
import { IEmployee } from '../../../entities/Employee';
import Permission from '../../../entities/Permission';
import { IEmployeeRepository } from '../../../interface-adapters/repositories/employee-repository';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { AccountService } from '../../../services/account-service';

interface ISetup {
    employeeRepository: IEmployeeRepository;
    accountRepository: IAccountRepository;
}

export class GetAllEmployeesUseCase implements IUseCase<undefined, IEmployee[]> {
    private readonly employeeRepository: IEmployeeRepository;
    private readonly accountRepository: IAccountRepository;

    constructor ({ employeeRepository, accountRepository }:ISetup) {
      this.employeeRepository = employeeRepository;
      this.accountRepository = accountRepository;
    }

    async execute ({ idOfExecutingAccount }:{ idOfExecutingAccount:string}): Promise<IEmployee[]> {
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.EMPLOYEE_LIST_ALL);
      return await this.employeeRepository.getAll();
    }
}
