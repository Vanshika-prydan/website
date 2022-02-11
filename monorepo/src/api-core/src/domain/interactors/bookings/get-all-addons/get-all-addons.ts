import IUseCase from '../../IUseCase';
import { IAddon } from '../../../entities/Addon';
import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { Setup } from './types';

export class GetAllAddonsUseCase implements IUseCase<undefined, IAddon[]> {
    private readonly addonRepository: IAddonRepository;
    constructor ({ addonRepository }:Setup) {
      this.addonRepository = addonRepository;
    }

    execute (): Promise<IAddon[]> {
      return this.addonRepository.getAll();
    }
}
