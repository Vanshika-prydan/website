import { v4 } from 'uuid';
import { IAddon } from '../Addon';
import MockAddon from '../Addon/mock-addon';
import { IBookingAddon } from './IBookingAddon';

export default class MockBookingAddon implements IBookingAddon {
    bookingAddonId: string;
    addon: IAddon;
    numberOfUnits: number;

    constructor (p:Partial<IBookingAddon> = {}) {
      this.bookingAddonId = p.bookingAddonId ?? v4();
      this.addon = p.addon ?? new MockAddon();
      this.numberOfUnits = p.numberOfUnits ?? 1;
    }
}
