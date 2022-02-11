import { v4 } from 'uuid';
import { IAddon } from '.';
import { Unit } from './IAddon';
import { Optional } from '../../../types/optional';

export class Addon implements IAddon {
  readonly addonId: string;
  readonly name: string;
  readonly description: string;
  readonly unit: Unit;
  readonly defaultTimeInMinutes: number;

  constructor (a: Optional<IAddon, 'addonId'>) {
    this.addonId = a.addonId ?? v4();
    this.name = a.name;
    this.description = a.description;
    this.unit = a.unit;
    this.defaultTimeInMinutes = a.defaultTimeInMinutes;
  }
}
