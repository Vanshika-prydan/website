import { v4 } from 'uuid';
import { IBookingAddon } from '.';
import { Optional } from '../../../types/optional';
import Addon, { IAddon } from '../Addon';

export class BookingAddon implements IBookingAddon {
 readonly bookingAddonId: string;
 readonly addon: IAddon;
 readonly numberOfUnits: number;

 constructor (ba:Optional<IBookingAddon, 'bookingAddonId'>) {
   this.bookingAddonId = ba.bookingAddonId ?? v4();
   this.addon = new Addon(ba.addon);
   this.numberOfUnits = ba.numberOfUnits;
 }
}
