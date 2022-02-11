import { IAddon } from '../Addon';

export interface IBookingAddon {
    bookingAddonId: string;
    addon: IAddon;
    numberOfUnits: number;
}
