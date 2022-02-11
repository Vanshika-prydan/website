import { MockBooking } from '../../entities/Booking/mock-booking';
import InvoiceService from '.';
import Invoice from '../../entities/Invoice';

describe('InvoiceService', () => {
  it('should generate an invoice from a booking', () => {
    const booking = new MockBooking();
    expect(InvoiceService.generateInvoiceFromBooking(booking)).toBeInstanceOf(Invoice);
  });
});
