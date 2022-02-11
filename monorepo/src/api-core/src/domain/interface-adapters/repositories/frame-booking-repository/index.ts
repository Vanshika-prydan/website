import { FrameBookingFullyDefined, FrameBookingInterface } from '../../../entities/FrameBooking/IFrameBooking';
import { FrameBookingLightInterface } from '../../../entities/FrameBookingLight';
import { CreateFrameBookingPayload } from './types';

export const FRAME_BOOKING_REPOSITORY_INTERFACE = 'IFrameBookingRepository';
interface IFrameBookingRepository {
  create(payload: CreateFrameBookingPayload): Promise<FrameBookingFullyDefined>;
  getAll(): Promise<FrameBookingFullyDefined[]>;
  findById(frameBookingId: string): Promise<FrameBookingFullyDefined | undefined>;
  findByCustomerId(customerId: string): Promise<FrameBookingFullyDefined[]>;
  findByEmployeeId(emplyeeId: string): Promise<FrameBookingFullyDefined[]>;
  cancel(frameBookingId: string): Promise<void>;
  findAllActive(): Promise<FrameBookingFullyDefined[]>;
  findActiveByEmployee(employeeId:string): Promise<FrameBookingInterface[]>;
  findFrameBookingLightByEmployeeId(employeeId:string): Promise<FrameBookingLightInterface[]>;
  save(frameBooking: FrameBookingInterface):Promise<FrameBookingInterface>;
}

export default IFrameBookingRepository;
