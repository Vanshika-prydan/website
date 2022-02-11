
import { v4 } from 'uuid';
import { IFrameBookingAddon } from '.';
import Addon from '../Addon';

export default class FrameBookingAddon implements IFrameBookingAddon {
  frameBookingAddonId: string;
  addon: Addon;
  numberOfUnits: number;

  constructor (data:IFrameBookingAddon) {
    this.frameBookingAddonId = data.frameBookingAddonId ?? v4();
    this.addon = new Addon(data.addon);
    this.numberOfUnits = data.numberOfUnits;
  }
}
