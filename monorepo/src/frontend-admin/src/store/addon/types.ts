import { AddonModel } from '../../models/addon.model';

export interface AddonState {
    addons: AddonModel[];
    isLoading: boolean;
}
