import { container } from 'tsyringe';
import BookingService from '../../domain/services/booking-service';

const bookingService = container.resolve(BookingService);
export default bookingService;
