import { IAddon } from '.';
import { Unit } from './IAddon';

export default class MockAddon implements IAddon {
    addonId: string;
    name: string;
    description: string;
    unit: Unit;
    defaultTimeInMinutes: number;

    constructor (p:Partial<IAddon> = {}) {
      this.addonId = p.addonId ?? 'fb48a36f-1fa7-44f1-8078-73491d7eb20b';
      this.name = p.name ?? 'Handdisk';
      this.description = p.description ?? 'Vi diskar allt för hand';
      this.unit = p.unit ?? 'ea';
      this.defaultTimeInMinutes = p.defaultTimeInMinutes ?? 30;
    }
}
