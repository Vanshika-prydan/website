import { IAddon } from '../Addon';

export interface IFrameBookingAddon {
    frameBookingAddonId: string;
    addon: IAddon;
    numberOfUnits: number;
}
