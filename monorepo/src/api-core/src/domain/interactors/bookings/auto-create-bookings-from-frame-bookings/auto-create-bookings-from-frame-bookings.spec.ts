import { mockFrameBooking } from '../../../../../mock/frame-booking';
import IFrameBookingRepository from '../../../interface-adapters/repositories/frame-booking-repository';
import BookingService from '../../../services/booking-service';
import { AutoCreateBookingsFromFrameBookingsUseCase } from './auto-create-bookings-from-frame-bookings';

describe('Create bookings from frame bookings', () => {
  it('should not throw', async () => {
    const bookingService = { createBookingsFromFrameBooking: jest.fn(() => Promise.resolve()) } as unknown as BookingService;
    const frameBookingRepository = { findAllActive: jest.fn(() => Promise.resolve([mockFrameBooking])) } as unknown as IFrameBookingRepository;
    const useCase = new AutoCreateBookingsFromFrameBookingsUseCase({ bookingService, frameBookingRepository });

    await useCase.execute();
  });
});
