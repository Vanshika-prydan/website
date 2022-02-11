import { CustomerAddressModel } from '../../models/customer-address.model';
import { OccurrenceType } from '../../services/api-service/types';

export interface SignedInBookingState {
  address: CustomerAddressModel | null;
  startTime: string | null;
  durationInMinutes: number | null;
  occurrence: OccurrenceType | null;
  specialInstructions: string;
  bookingTypeId: string | null;
  employeeId: string | null;
  addonIds: string[];
}
