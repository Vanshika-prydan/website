import { v4 } from 'uuid';
import Invoice, { InvoiceInterface } from '.';
import { MockBooking } from '../Booking/mock-booking';

export default class MockInvoice extends Invoice {
  constructor (d: Partial<InvoiceInterface> = {}) {
    super(
      {
        bookingId: d.booking?.bookingId ?? d.bookingId ?? v4(),
        booking: d.booking ?? new MockBooking(),
        createdAt: d.createdAt,
        invoiceId: d.invoiceId ?? 23,
        priceInOre: d.priceInOre ?? 1000,
        priceInOreInclVAT: d.priceInOreInclVAT ?? 1250,
      },
    );
  }
}
