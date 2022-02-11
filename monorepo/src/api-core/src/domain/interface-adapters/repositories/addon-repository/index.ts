import { IAddon } from '../../../entities/Addon';
import { CreateAddonRequestPayload } from './create-addon-request-payload';

export const ADDON_REPOSITORY_INTERFACE = 'IAddonRepository';
export interface IAddonRepository {
  create(payload: CreateAddonRequestPayload): Promise<IAddon>;
  getAll(): Promise<IAddon[]>;
  findById(addonId: string): Promise<IAddon|undefined>;
  findByIds(addonIds: string[]):Promise<IAddon[]>;
}
