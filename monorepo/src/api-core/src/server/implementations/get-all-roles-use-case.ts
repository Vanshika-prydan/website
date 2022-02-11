import { GetAllRolesUseCase } from '../../domain/interactors/acccount/get-all-roles/get-all-roles';
import accountRepository from './account-respository';
import roleRepository from './role-repository';

const getAllRolesUseCase = new GetAllRolesUseCase({ accountRepository, roleRepository });

export default getAllRolesUseCase;
