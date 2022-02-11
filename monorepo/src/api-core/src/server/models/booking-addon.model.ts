import { IBookingAddon } from '../../domain/entities/BookingAddon';
import { IFrameBookingAddon } from '../../domain/entities/FrameBookingAddon';
import AddonDTO, { AddonModel } from './addon.model';

export interface BookingAddonModel {
    // bookingAddonId: string;
    addon: AddonModel;
    numberOfUnits: number;
}

export class BookingAddonDTO implements BookingAddonModel {
    // bookingAddonId: string;
    addon: AddonModel;
    numberOfUnits: number;

    constructor (bookingAddon: IBookingAddon | IFrameBookingAddon) {
      this.addon = new AddonDTO(bookingAddon.addon);
      this.numberOfUnits = bookingAddon.numberOfUnits;
      // this.bookingAddonId = bookingAddon.bookingAddonId;
    }
}
