import { Unit } from '../../../entities/Addon/IAddon';

export interface CreateAddonRequestPayload {
    name: string;
    description: string;
    unit: Unit;
    defaultTimeInMinutes: number;
}
