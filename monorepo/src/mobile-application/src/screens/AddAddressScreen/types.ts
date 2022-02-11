export const Address = ['Hemadress', 'Kontor', 'Landställe'];
export type AddressType = 'Hemadress' | 'Kontor' | 'Landställe';

export interface Props {
  onCreated(): void;
}

export interface FormValues {
  street: string;
  postalCode: string;
  doorCode: string;
  areaInM2: string;
  numberOfBathRooms: string;
  addressType: AddressType;
}
