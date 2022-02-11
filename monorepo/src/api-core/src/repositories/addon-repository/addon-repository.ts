import { getRepository } from 'typeorm';
import { Addon } from '../../database/entities/Addon';
import { IAddon } from '../../domain/entities/Addon';
import { IAddonRepository } from '../../domain/interface-adapters/repositories/addon-repository';
import { CreateAddonRequestPayload } from '../../domain/interface-adapters/repositories/addon-repository/create-addon-request-payload';

export class AddonRepository implements IAddonRepository {
  findByIds (addonIds: string[]): Promise<IAddon[]> {
    return getRepository(Addon).findByIds(addonIds);
  }

  findById (addonId: string): Promise<IAddon|undefined> {
    return getRepository(Addon).findOne(addonId);
  }

  async create (payload: CreateAddonRequestPayload): Promise<IAddon> {
    const addon = new Addon();
    addon.defaultTimeInMinutes = payload.defaultTimeInMinutes;
    addon.description = payload.description;
    addon.name = payload.name;
    addon.unit = payload.unit;
    await getRepository(Addon).save(addon);
    return addon;
  }

  getAll (): Promise<IAddon[]> {
    return getRepository(Addon).find();
  }
}
