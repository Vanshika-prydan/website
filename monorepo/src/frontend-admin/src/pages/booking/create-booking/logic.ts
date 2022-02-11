import { AddonModel } from '../../../models/addon.model';

export const calculatePresetTimeInMinutes = (addons?: AddonModel[]): number => {
  let defaultTime = 0;
  if (addons) {
    const defaultTimeArrayFromAddons: number[] = addons.map(
      (a) => a.defaultTimeInMinutes
    );
    defaultTime += defaultTimeArrayFromAddons.reduce(
      (prev, addon) => prev + addon,
      0
    );
  }
  return defaultTime;
};
export default calculatePresetTimeInMinutes;
