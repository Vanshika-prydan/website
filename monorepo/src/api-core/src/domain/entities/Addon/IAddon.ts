export type Unit = 'h' | 'min' | 'ea';
export interface IAddon {
    addonId: string;
    name: string;
    description: string;
    unit: Unit;
    defaultTimeInMinutes: number;
}
