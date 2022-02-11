import { OccurrenceType } from '../../services/api-service/types';

export type BookingType = 'HOME_CLEANING';
export interface MakeBookingState {
  bookingType: BookingType;
  postalCode: string;
  homeAreaInM2: number | null;
  numberOfBathrooms: number | null;
  durationInMinutes: number | null;
  addonIds: string[];
  selectedEmployeeId: string | null;
  occurrence: OccurrenceType | null;
  startTime: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  personalIdentityNumber: string;
  street: string;
  postalCity: string;
  doorCode: string;
  acceptsCommunication: boolean;
}
