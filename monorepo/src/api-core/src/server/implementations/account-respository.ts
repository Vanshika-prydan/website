import { container } from 'tsyringe';
import AccountRepository from '../../repositories/account-respository';

const accountRepository = container.resolve(AccountRepository);

export default accountRepository;
