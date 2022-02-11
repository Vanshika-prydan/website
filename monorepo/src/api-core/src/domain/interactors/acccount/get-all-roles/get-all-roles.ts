import IUseCase from '../../IUseCase';
import Permission from '../../../entities/Permission';
import { IRole } from '../../../entities/Role';
import { IAccountRepository } from '../../../interface-adapters/repositories/account-repository';
import { IRoleRepository } from '../../../interface-adapters/repositories/role-repository';
import { AccountService } from '../../../services/account-service';

interface ISetup {
    roleRepository: IRoleRepository;
    accountRepository: IAccountRepository;
}

export class GetAllRolesUseCase implements IUseCase<undefined, IRole[]> {
    private readonly roleRepository: IRoleRepository;
    private readonly accountRepository: IAccountRepository;
    constructor (setup: ISetup) {
      this.roleRepository = setup.roleRepository;
      this.accountRepository = setup.accountRepository;
    }

    async execute ({ idOfExecutingAccount }: { idOfExecutingAccount: string }): Promise<IRole[]> {
      await AccountService.loadAccountAndAuthorize(this.accountRepository, idOfExecutingAccount, Permission.ROLE_LIST_ALL);
      return this.roleRepository.getAll();
    }
}
