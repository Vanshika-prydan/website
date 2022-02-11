import { IRoleRepository } from '../../domain/interface-adapters/repositories/role-repository';
import RoleRepository from '../../repositories/role-repository';

const roleRepository: IRoleRepository = new RoleRepository();

export default roleRepository;
