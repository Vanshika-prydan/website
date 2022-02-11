import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import Invoice, { InvoiceInterface, InvoiceWithBooking, InvoiceWithoutId } from '../../entities/Invoice';
import { ErrorCode } from '../../entities/ErrorCode';
import { InvoiceRepositoryInterface, INVOICE_REPOSITORY_INTERFACE } from '../../interface-adapters/repositories/invoice-repository';
import { addVAT, calculatePrice } from '../price-service/price-utils';
import { IBooking } from '../../entities/Booking';
import { getDurationInMinutesFromBooking } from '../booking-utils';

@injectable()
export default class InvoiceService {
  constructor (@inject(INVOICE_REPOSITORY_INTERFACE) private readonly invoiceRepository: InvoiceRepositoryInterface) {}

  public static async validateOrFail (payload:InvoiceInterface):Promise<void> {
    if (!(await InvoiceService.validate(payload))) throw new Error(ErrorCode.INVALID_INPUT);
  }

  public static async validate (payload:InvoiceInterface):Promise<boolean> {
    const obj = new Invoice(payload);
    try {
      await validateOrReject(obj);
      return true;
    } catch (e) {
      return false;
    }
  }

  public static generateInvoiceFromBooking (booking: IBooking):Invoice {
    const priceInOre = calculatePrice(booking.frameBooking?.occurrence ?? 'onetime', getDurationInMinutesFromBooking(booking));
    return new Invoice({ booking, priceInOre, priceInOreInclVAT: addVAT(priceInOre) });
  }

  public static isInvoiceWithId (invoice:InvoiceInterface | InvoiceWithoutId): invoice is InvoiceInterface {
    return !!(invoice as InvoiceInterface).invoiceId;
  }

  public static isInvoiceWithBooking (invoice:InvoiceInterface): invoice is InvoiceWithBooking {
    return !!invoice.booking;
  }
}
