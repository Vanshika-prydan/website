import validator from 'validator';
import { IAddon, Unit } from '../../domain/entities/Addon/IAddon';

export interface AddonModel {
    addonId: string;
    name: string;
    description: string;
    unit: Unit;
    defaultTimeInMinutes: number;
}

export default class AddonDTO implements AddonModel {
    addonId: string;
    name: string;
    description: string;
    unit: Unit;
    defaultTimeInMinutes: number;

    constructor (addon: IAddon) {
      this.addonId = addon.addonId;
      this.name = validator.escape(addon.name);
      this.defaultTimeInMinutes = addon.defaultTimeInMinutes;
      this.unit = validator.escape(addon.unit) as Unit;
      this.description = validator.escape(addon.description);
    }
}
